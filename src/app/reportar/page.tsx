"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send, ArrowLeft, Terminal, User, MapPin, Camera, X, Plus, Trash2, Edit2, Check, Settings } from "lucide-react";
import Link from "next/link";

export default function Reportar() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    aula: "",
  });
  const [archivos, setArchivos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [enviando, setEnviando] = useState(false);

  // Estados para Ubicaciones Dinámicas y Gestión de Admin
  const [user, setUser] = useState<any>(null);
  const [ubicaciones, setUbicaciones] = useState<any[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [nuevaUbicacion, setNuevaUbicacion] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(data => {
        if (!data.error) setUser(data);
      })
      .catch(err => console.error(err));

    cargarUbicaciones();
  }, []);

  const cargarUbicaciones = async () => {
    try {
      const res = await fetch("/api/ubicaciones");
      if (res.ok) {
        const data = await res.json();
        setUbicaciones(data);
      }
    } catch (err) {
      console.error("Error al cargar ubicaciones:", err);
    }
  };

  const agregarUbicacion = async () => {
    if (!nuevaUbicacion.trim()) return;
    try {
      const res = await fetch("/api/ubicaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevaUbicacion })
      });
      if (res.ok) {
        setNuevaUbicacion("");
        cargarUbicaciones();
      } else {
        const data = await res.json();
        alert(data.error || "Error al agregar");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const guardarEdicion = async (id: number) => {
    if (!editingName.trim()) return;
    try {
      const res = await fetch(`/api/ubicaciones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: editingName })
      });
      if (res.ok) {
        setEditingId(null);
        cargarUbicaciones();
      } else {
        const data = await res.json();
        alert(data.error || "Error al editar");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarUbicacion = async (id: number, nombre: string) => {
    if (!confirm(`¿Eliminar la ubicación "${nombre}" del menú desplegable?`)) return;
    try {
      const res = await fetch(`/api/ubicaciones/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        cargarUbicaciones();
      } else {
        alert("Error al eliminar la ubicación");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    
    const data = new FormData();
    data.append("titulo", formData.titulo);
    data.append("descripcion", formData.descripcion);
    data.append("aula", formData.aula);

    
    archivos.forEach((archivo) => {
      data.append("imagenes", archivo);
    });

    const res = await fetch("/api/incidencias", {
      method: "POST",
      body: data,
    });
    
    if (res.ok) {
      router.push("/");
    } else {
      alert("Error al enviar el reporte");
      setEnviando(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setArchivos(prev => [...prev, ...filesArray]);
      
      const newUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newUrls]);
    }
  };

  const removeFile = (index: number) => {
    setArchivos(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <Link href="/" className="inline-flex items-center gap-2 text-blue-800/80 hover:text-red-600 font-bold mb-8 transition-colors">
        <ArrowLeft size={18} />
        Regresar al Tablero
      </Link>
      
      <div className="premium-card p-8 md:p-12 rounded-3xl">
        <div className="mb-10 border-b border-blue-50 pb-8">
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-blue-950">Registrar Incidencia</h2>
          <p className="text-blue-800/80 text-lg font-medium">
            Completa el siguiente formulario para solicitar soporte técnico en las instalaciones.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-blue-950 flex items-center gap-2">
              <Terminal size={16} className="text-red-600"/> Título del Problema
            </label>
            <input 
              required 
              name="titulo" 
              placeholder="Ej. Computadoras N°5 y N°6 no dan video"
              onChange={handleChange} 
              className="w-full p-4 bg-white border border-blue-100 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-blue-950 placeholder-blue-900/40 transition-all shadow-sm" 
            />
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-blue-950 flex items-center gap-2">
                  <MapPin size={16} className="text-red-600"/> Ubicación
                </label>
                {user?.rol === 'ADMIN' && (
                  <button
                    type="button"
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                    className="text-xs font-bold bg-blue-100 hover:bg-blue-200 text-blue-900 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Settings size={14} className="text-red-600" />
                    {showAdminPanel ? "Ocultar Panel de Ambientes" : "⚙️ Administrar Ubicaciones (Admin)"}
                  </button>
                )}
              </div>

              <div className="relative">
                <select 
                  required 
                  name="aula" 
                  value={formData.aula}
                  onChange={handleChange} 
                  className="w-full p-4 bg-white border border-blue-100 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-blue-950 appearance-none transition-all cursor-pointer shadow-sm"
                >
                  <option value="">Selecciona el ambiente...</option>
                  {ubicaciones.map(u => (
                    <option key={u.id} value={u.nombre}>{u.nombre}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-800/50">
                  ▼
                </div>
              </div>

              {/* Panel exclusivo para Administrador */}
              {user?.rol === 'ADMIN' && showAdminPanel && (
                <div className="bg-blue-50/80 p-5 rounded-2xl border border-blue-200 space-y-4 mt-3 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                    <h4 className="font-extrabold text-blue-950 text-sm flex items-center gap-2">
                      <Settings size={15} className="text-red-600" /> Panel de Control de Ubicaciones (Exclusivo Administrador)
                    </h4>
                  </div>

                  {/* Agregar nueva ubicación */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ej. Taller de Redes y Conectividad..."
                      value={nuevaUbicacion}
                      onChange={(e) => setNuevaUbicacion(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm bg-white border border-blue-200 rounded-lg text-blue-950 placeholder-blue-900/40 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                    <button
                      type="button"
                      onClick={agregarUbicacion}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-1 shadow-sm transition-colors"
                    >
                      <Plus size={16} /> Agregar
                    </button>
                  </div>

                  {/* Lista de ubicaciones existentes para editar/eliminar */}
                  <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                    {ubicaciones.map(u => (
                      <div key={u.id} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-blue-100 shadow-2xs">
                        {editingId === u.id ? (
                          <div className="flex items-center gap-2 flex-1 mr-2">
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="w-full text-sm px-2 py-1 border border-blue-300 rounded focus:outline-none focus:border-red-500 text-blue-950 font-medium"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => guardarEdicion(u.id)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded transition-colors"
                              title="Guardar"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="bg-gray-400 hover:bg-gray-500 text-white p-1.5 rounded transition-colors"
                              title="Cancelar"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm font-semibold text-blue-950 truncate">{u.nombre}</span>
                        )}

                        {editingId !== u.id && (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(u.id);
                                setEditingName(u.nombre);
                              }}
                              className="p-1.5 hover:bg-blue-50 text-blue-700 rounded transition-colors"
                              title="Editar ubicación"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => eliminarUbicacion(u.id, u.nombre)}
                              className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
                              title="Eliminar ubicación"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-blue-950">Descripción Detallada</label>
            <textarea 
              required 
              name="descripcion" 
              rows={4}
              placeholder="Brinda todos los detalles posibles sobre la incidencia..."
              onChange={handleChange} 
              className="w-full p-4 bg-white border border-blue-100 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-blue-950 placeholder-blue-900/40 transition-all resize-none shadow-sm" 
            />
          </div>

          <div className="space-y-4 bg-blue-50/50 p-6 rounded-xl border border-blue-100 border-dashed">
            <label className="text-sm font-bold text-blue-950 flex items-center gap-2">
              <Camera size={16} className="text-red-600"/> Adjuntar Fotografías (Múltiples)
            </label>
            
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative w-full h-32 rounded-xl overflow-hidden border border-blue-200 shadow-sm">
                    <img src={url} alt={`Evidencia ${index + 1}`} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 shadow-md transition-colors"
                      title="Eliminar foto"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="relative">
              <input 
                type="file" 
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full text-blue-900 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-800 hover:file:bg-blue-200 cursor-pointer"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={enviando}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {enviando ? "Subiendo Reporte y Fotos..." : <><Send size={20} /> Registrar Incidencia</>}
          </button>
        </form>
      </div>
    </div>
  );
}
