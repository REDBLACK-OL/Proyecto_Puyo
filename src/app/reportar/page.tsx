"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, ArrowLeft, Terminal, User, MapPin, Camera, X } from "lucide-react";
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-blue-950 flex items-center gap-2">
                <MapPin size={16} className="text-red-600"/> Ubicación
              </label>
              <div className="relative">
                <select 
                  required 
                  name="aula" 
                  onChange={handleChange} 
                  className="w-full p-4 bg-white border border-blue-100 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-blue-950 appearance-none transition-all cursor-pointer shadow-sm"
                >
                  <option value="">Selecciona el ambiente...</option>
                  <option value="Laboratorio de Cómputo 1">Laboratorio de Cómputo 1</option>
                  <option value="Laboratorio de Cómputo 2">Laboratorio de Cómputo 2</option>
                  <option value="Laboratorio de Cómputo 3">Laboratorio de Cómputo 3</option>
                  <option value="Taller de Electrónica">Taller de Electrónica</option>
                  <option value="Taller de Mecánica">Taller de Mecánica</option>
                  <option value="Aula 101">Aula 101</option>
                  <option value="Biblioteca">Biblioteca</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-800/50">
                  ▼
                </div>
              </div>
            </div>
            {/* El usuario se asigna automáticamente mediante la sesión (DNI) */}
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
