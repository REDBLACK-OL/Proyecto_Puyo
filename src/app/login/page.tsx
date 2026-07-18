"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Building2, KeyRound, Lock, UserCheck } from "lucide-react";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Estados para admin
  const [isAdminRole, setIsAdminRole] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(false);
  
  // Estados para recuperar
  const [nombres, setNombres] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (dni.length === 8) {
      const checkRole = async () => {
        try {
          const res = await fetch("/api/auth/check-role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dni })
          });
          const data = await res.json();
          if (data.role === 'ADMIN') {
            setIsAdminRole(true);
          } else {
            setIsAdminRole(false);
            setRecoveryMode(false);
          }
        } catch (error) {
          setIsAdminRole(false);
        }
      };
      checkRole();
    } else {
      setIsAdminRole(false);
      setRecoveryMode(false);
    }
  }, [dni]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    if (recoveryMode) {
      const res = await fetch("/api/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dni, nombres, newPassword }),
      });
      const data = await res.json();
      setLoading(false);
      
      if (res.ok) {
        setSuccessMsg("Contraseña recuperada exitosamente. Ahora puedes iniciar sesión.");
        setRecoveryMode(false);
        setPassword(newPassword);
      } else {
        setError(data.error || "Error al recuperar la contraseña");
      }
      return;
    }

    if (isAdminRole && !password.trim()) {
      setError("PONGA LA CONTRASEÑA PARA ACCEDER AL SISTEMA");
      setLoading(false);
      return;
    }

    const payload: any = { dni };
    if (isAdminRole) {
      payload.password = password;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else if (data.requiresPassword) {
      setIsAdminRole(true);
      setError("PONGA LA CONTRASEÑA PARA ACCEDER AL SISTEMA");
      setLoading(false);
    } else {
      setError(data.error || "Error al iniciar sesión");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
        <div className="bg-blue-900 p-8 text-center">
          <div className="bg-white w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg mb-4 p-1">
            <Image src="/Logo-suiza.png" alt="Logo Suiza" width={64} height={64} className="rounded-full object-contain" />
          </div>
          <h1 className="text-2xl font-black text-white mb-1">IESTP Suiza</h1>
          <p className="text-blue-200 text-sm font-bold tracking-widest uppercase">Portal de Incidencias</p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-black text-blue-950 mb-6 text-center">
            {recoveryMode ? "Recuperar Contraseña" : "Iniciar Sesión"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-bold text-blue-950 flex items-center gap-2 mb-2">
                <KeyRound size={16} className="text-red-600"/> Documento de Identidad (DNI)
              </label>
              <input 
                required 
                type="text"
                name="dni" 
                placeholder="Ingresa tu número de DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value.replace(/[^0-9]/g, '').slice(0, 8))}
                disabled={recoveryMode}
                className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-blue-950 placeholder-blue-900/40 transition-all font-mono text-lg text-center tracking-widest disabled:opacity-50" 
              />
            </div>

            {isAdminRole && !recoveryMode && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="text-sm font-bold text-blue-950 flex items-center gap-2 mb-2">
                  <Lock size={16} className="text-red-600"/> Contraseña de Administrador
                </label>
                <input 
                  required 
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-blue-950 placeholder-blue-900/40 transition-all text-center tracking-widest" 
                />
                <div className="flex justify-end mt-2">
                  <button 
                    type="button" 
                    onClick={() => { setRecoveryMode(true); setError(""); setSuccessMsg(""); }}
                    className="text-sm font-bold text-red-600 hover:text-red-800 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>
            )}

            {recoveryMode && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-4">
                <div>
                  <label className="text-sm font-bold text-blue-950 flex items-center gap-2 mb-2">
                    <UserCheck size={16} className="text-red-600"/> Tus Nombres (Como están registrados)
                  </label>
                  <input 
                    required 
                    type="text"
                    placeholder="Ej. Juan Perez"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-blue-950 placeholder-blue-900/40 transition-all text-center" 
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-blue-950 flex items-center gap-2 mb-2">
                    <Lock size={16} className="text-red-600"/> Nueva Contraseña
                  </label>
                  <input 
                    required 
                    type="password"
                    placeholder="Ingresa nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-blue-950 placeholder-blue-900/40 transition-all text-center tracking-widest" 
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <button 
                    type="button" 
                    onClick={() => setRecoveryMode(false)}
                    className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Volver a iniciar sesión
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold text-center border border-red-100">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-bold text-center border border-green-200">
                {successMsg}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading || dni.length < 8}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Procesando..." : (recoveryMode ? "Restablecer Contraseña" : "Ingresar al Sistema")}
            </button>
          </form>
        </div>
      </div>
      
      <p className="text-blue-800/60 mt-8 text-sm font-medium">
        Solo personal autorizado puede ingresar a este sistema.
      </p>
    </div>
  );
}
