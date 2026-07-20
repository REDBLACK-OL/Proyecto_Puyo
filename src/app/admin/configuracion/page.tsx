"use client";

import { useState, useEffect } from "react";
import { Settings, Plus, Trash2, Edit2, Check, X, MapPin, ShieldAlert, ArrowLeft, Building2, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ConfiguracionAdminPage() {
  const router = useRouter();
  const [ubicaciones, setUbicaciones] = useState<any[]>([]);
  const [nuevaUbicacion, setNuevaUbicacion] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [cargando, setCargando] = useState(true);
  const [errorAuth, setErrorAuth] = useState(false);

  // 1. Verificación de seguridad: Al abrir la página consulta si eres Administrador antes de mostrar el panel de aulas
  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(user => {
        if (!user || user.error || user.rol !== 'ADMIN') {
          setErrorAuth(true);
          setCargando(false);
        } else {
          cargarUbicaciones();
        }
      })
      .catch(() => {
        setErrorAuth(true);
        setCargando(false);
      });
  }, []);

  // 2. cargarUbicaciones: Consulta a la base de datos la lista de ambientes/laboratorios activos
  const cargarUbicaciones = async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/ubicaciones");
      if (res.ok) {
        const data = await res.json();
        setUbicaciones(data);
      }
    } catch (err) {
      console.error("Error al cargar ubicaciones:", err);
    } finally {
      setCargando(false);
    }
  };

  // 3. agregarUbicacion: Envía petición POST al servidor para crear un nuevo laboratorio dinámico en PostgreSQL
  const agregarUbicacion = async (e: React.FormEvent) => {
    e.preventDefault();
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
        alert(data.error || "Error al agregar la ubicación");
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
        alert(data.error || "Error al editar la ubicación");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarUbicacion = async (id: number, nombre: string) => {
    if (!confirm(`¿Estás seguro de eliminar el ambiente "${nombre}"? Se quitará de las opciones en todo el sistema.`)) return;
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

  if (errorAuth) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="premium-card p-12 rounded-3xl space-y-6">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert size={36} />
          </div>
          <h2 className="text-2xl font-black text-blue-950">Acceso Restringido</h2>
          <p className="text-blue-800/80">Este panel de configuración central está reservado exclusivamente para los Administradores del IESTP Suiza.</p>
          <Link href="/" className="inline-block bg-blue-900 hover:bg-blue-950 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md">
            Volver al Tablero
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-16 space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-blue-800/80 hover:text-red-600 font-bold text-sm mb-2 transition-colors">
            <ArrowLeft size={16} /> Regresar al Tablero Principal
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-blue-950 flex items-center gap-3">
            <span className="p-2.5 bg-blue-900 text-white rounded-2xl shadow-md flex items-center justify-center">
              <Settings size={28} className="text-red-500" />
            </span>
            Panel Maestro de Configuración
          </h1>
          <p className="text-blue-800/80 font-medium text-base mt-2">
            Administración centralizada de Ambientes, Laboratorios y Parámetros Operativos del Sistema SOP Suiza.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tarjeta 1: Gestión de Ambientes */}
        <div className="lg:col-span-2 premium-card p-8 rounded-3xl space-y-6">
          <div className="border-b border-blue-100 pb-5 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-blue-950 flex items-center gap-2">
                <MapPin size={22} className="text-red-600" />
                Catálogo de Aulas y Laboratorios
              </h2>
              <p className="text-sm text-blue-800/70">
                Estas opciones aparecen dinámicamente en el selector de ubicación de todos los reportes del sistema.
              </p>
            </div>
            <span className="bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
              {ubicaciones.length} ambientes activos
            </span>
          </div>

          {/* Formulario de Agregar Nuevo Ambiente */}
          <form onSubmit={agregarUbicacion} className="flex gap-3 bg-blue-50/70 p-4 rounded-2xl border border-blue-200 shadow-2xs">
            <input
              type="text"
              placeholder="Ej. Taller de Mantenimiento y Ensamblaje..."
              value={nuevaUbicacion}
              onChange={(e) => setNuevaUbicacion(e.target.value)}
              className="flex-1 px-4 py-3 text-sm bg-white border border-blue-200 rounded-xl text-blue-950 placeholder-blue-900/40 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 font-medium shadow-2xs"
            />
            <button
              type="submit"
              disabled={cargando}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              <Plus size={18} /> Agregar
            </button>
          </form>

          {/* Listado Interactivo de Aulas */}
          <div className="space-y-3 pt-2 max-h-[450px] overflow-y-auto pr-1">
            {cargando && ubicaciones.length === 0 ? (
              <div className="text-center py-12 text-blue-800/60 font-semibold animate-pulse">
                Cargando laboratorios registrados...
              </div>
            ) : ubicaciones.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-500">
                No hay ambientes registrados. Agrega el primero arriba.
              </div>
            ) : (
              ubicaciones.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between bg-white p-4 rounded-2xl border border-blue-100 shadow-2xs hover:border-blue-300 transition-all group"
                >
                  {editingId === u.id ? (
                    <div className="flex items-center gap-3 flex-1 mr-4">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-red-500 rounded-xl focus:outline-none text-blue-950 font-bold text-sm bg-blue-50/30"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => guardarEdicion(u.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Check size={16} /> Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-900 font-extrabold text-sm shadow-2xs group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                        <Building2 size={18} />
                      </div>
                      <div>
                        <span className="font-extrabold text-blue-950 text-base block">{u.nombre}</span>
                        <span className="text-xs text-blue-800/60 font-semibold">ID de Sistema: #{u.id}</span>
                      </div>
                    </div>
                  )}

                  {editingId !== u.id && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(u.id);
                          setEditingName(u.nombre);
                        }}
                        className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl transition-colors border border-blue-100 font-bold text-xs flex items-center gap-1.5"
                        title="Modificar nombre de ambiente"
                      >
                        <Edit2 size={15} /> Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => eliminarUbicacion(u.id, u.nombre)}
                        className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors border border-red-100 font-bold text-xs flex items-center gap-1.5"
                        title="Eliminar ambiente"
                      >
                        <Trash2 size={15} /> Eliminar
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tarjeta 2: Estado Operativo y Seguridad */}
        <div className="space-y-6">
          <div className="premium-card p-6 rounded-3xl space-y-5">
            <h3 className="font-black text-blue-950 text-lg flex items-center gap-2 border-b border-blue-100 pb-3">
              <ShieldAlert size={20} className="text-red-600" />
              Estado del Sistema Maestro
            </h3>
            
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100 space-y-1">
                <span className="font-bold text-blue-950 block">Módulo de Restablecimiento</span>
                <p className="text-xs text-blue-800/80 leading-relaxed">
                  Activo para autenticación literal por DNI de Administrador en pantalla de inicio. Operación directa sin generación de tickets.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-1">
                <span className="font-bold text-emerald-950 block">Sincronización Dinámica</span>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Todos los laboratorios y aulas registrados aquí se reflejan de inmediato para estudiantes, docentes y técnicos.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-blue-100 space-y-3">
              <Link
                href="/admin/usuarios"
                className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-between text-sm shadow-sm"
              >
                <span className="flex items-center gap-2"><Users size={16} /> Gestión de Usuarios</span>
                <span>→</span>
              </Link>
              <Link
                href="/reportar"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-between text-sm shadow-sm"
              >
                <span>Probar Formulario de Reporte</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
