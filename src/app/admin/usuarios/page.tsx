"use client";

import { useEffect, useState } from "react";
import { Users, Plus, ShieldAlert, Trash2, Edit2, CheckCircle2 } from "lucide-react";
import { Usuario } from "@/types";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [formData, setFormData] = useState({ dni: "", nombres: "", turno: "MANANA", rol: "USER" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUsuarios = async () => {
    const res = await fetch("/api/admin/usuarios");
    if (res.ok) setUsuarios(await res.json());
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const url = editingId ? `/api/admin/usuarios/${editingId}` : "/api/admin/usuarios";
    const method = editingId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ dni: "", nombres: "", turno: "MANANA", rol: "USER" });
      setEditingId(null);
      setSuccess(editingId ? "Usuario actualizado correctamente" : "Usuario creado correctamente");
      fetchUsuarios();
    } else {
      const data = await res.json();
      setError(data.error || "Ocurrió un error");
    }
    setLoading(false);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleEdit = (user: Usuario) => {
    setEditingId(user.id);
    setFormData({
      dni: user.dni,
      nombres: user.nombres,
      turno: user.turno,
      rol: user.rol,
    });
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este usuario? También se eliminarán todas sus incidencias de la base de datos.")) return;
    
    setError("");
    setSuccess("");
    
    const res = await fetch(`/api/admin/usuarios/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setSuccess("Usuario eliminado correctamente de la base de datos");
      fetchUsuarios();
      if (editingId === id) {
        setEditingId(null);
        setFormData({ dni: "", nombres: "", turno: "MANANA", rol: "USER" });
      }
    } else {
      const data = await res.json();
      setError(data.error || "Error al eliminar");
    }
    setTimeout(() => setSuccess(""), 3000);
  };

  const getRoleLabel = (rol: string) => {
    if (rol === 'ADMIN') return 'Administrador';
    if (rol === 'DOCENTE') return 'Docente';
    return 'Estudiante';
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-in fade-in">
      <div className="flex flex-col mb-10 border-b border-blue-100 pb-8">
        <h2 className="text-4xl font-black text-blue-950 tracking-tight mb-3 flex items-center gap-3">
          <Users className="text-red-600" size={36}/> Gestión de Usuarios
        </h2>
        <p className="text-blue-800/80 text-lg">
          Panel exclusivo para administradores. Registra a los estudiantes, docentes y personal técnico.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Formulario de Registro */}
        <div className="lg:col-span-1">
          <div className="premium-card p-6 rounded-3xl sticky top-24 border-t-4 border-t-red-600">
            <h3 className="text-xl font-bold text-blue-950 mb-6 flex items-center gap-2">
              {editingId ? <Edit2 size={20} className="text-red-600"/> : <Plus size={20} className="text-red-600"/>} 
              {editingId ? "Editar Usuario" : "Registrar Usuario"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-blue-950 uppercase tracking-wider">DNI</label>
                <input required type="text" value={formData.dni} onChange={e => setFormData({...formData, dni: e.target.value.replace(/\D/g,'').slice(0,8)})} className="w-full mt-1 p-3 bg-blue-50 border border-blue-100 rounded-xl focus:ring-1 focus:ring-red-500" placeholder="8 dígitos" />
              </div>
              <div>
                <label className="text-xs font-bold text-blue-950 uppercase tracking-wider">Nombres Completos</label>
                <input required type="text" value={formData.nombres} onChange={e => setFormData({...formData, nombres: e.target.value})} className="w-full mt-1 p-3 bg-blue-50 border border-blue-100 rounded-xl focus:ring-1 focus:ring-red-500" placeholder="Ej. Juan Pérez" />
              </div>
              <div>
                <label className="text-xs font-bold text-blue-950 uppercase tracking-wider">Turno</label>
                <select value={formData.turno} onChange={e => setFormData({...formData, turno: e.target.value})} className="w-full mt-1 p-3 bg-blue-50 border border-blue-100 rounded-xl focus:ring-1 focus:ring-red-500">
                  <option value="MANANA">Mañana</option>
                  <option value="TARDE">Tarde</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-blue-950 uppercase tracking-wider">Rol de Sistema</label>
                <select value={formData.rol} onChange={e => setFormData({...formData, rol: e.target.value})} className="w-full mt-1 p-3 bg-blue-50 border border-blue-100 rounded-xl focus:ring-1 focus:ring-red-500">
                  <option value="USER">Usuario (Estudiante)</option>
                  <option value="DOCENTE">Docente</option>
                  <option value="ADMIN">Administrador (Técnico)</option>
                </select>
              </div>

              {error && <p className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
              {success && <p className="text-green-700 text-sm font-bold bg-green-50 p-3 rounded-lg border border-green-200 flex items-center gap-2"><CheckCircle2 size={16}/> {success}</p>}

              <div className="flex gap-2 mt-4">
                <button type="submit" disabled={loading || formData.dni.length < 8} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-md disabled:opacity-50">
                  {loading ? "Guardando..." : (editingId ? "Actualizar" : "Crear Cuenta")}
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setFormData({ dni: "", nombres: "", turno: "MANANA", rol: "USER" }); setError(""); setSuccess(""); }} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-xl transition-all">
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Lista de Usuarios */}
        <div className="lg:col-span-2 space-y-4">
          {usuarios.map(u => (
            <div key={u.id} className={`premium-card p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between group border transition-all ${editingId === u.id ? 'border-red-300 bg-red-50/30' : 'border-transparent hover:border-blue-100'}`}>
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${u.rol === 'ADMIN' ? 'bg-red-100 text-red-700' : u.rol === 'DOCENTE' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                  {u.nombres.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-blue-950 text-lg flex items-center gap-2">
                    {u.nombres} 
                    {u.rol === 'ADMIN' && <span title="Administrador"><ShieldAlert size={14} className="text-red-600"/></span>}
                  </h4>
                  <div className="flex flex-wrap gap-2 text-sm mt-1">
                    <span className="text-blue-800 font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-100">DNI: {u.dni}</span>
                    <span className="text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{getRoleLabel(u.rol)}</span>
                    <span className="text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Turno {u.turno === 'MANANA' ? 'Mañana' : 'Tarde'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <button onClick={() => handleEdit(u)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-bold transition-colors border border-blue-100">
                  <Edit2 size={16} /> <span className="sm:hidden">Editar</span>
                </button>
                <button onClick={() => handleDelete(u.id)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-lg font-bold transition-colors border border-red-100">
                  <Trash2 size={16} /> <span className="sm:hidden">Eliminar</span>
                </button>
              </div>
            </div>
          ))}
          {usuarios.length === 0 && <p className="text-blue-800/50 italic text-center mt-10">Cargando usuarios...</p>}
        </div>

      </div>
    </div>
  );
}
