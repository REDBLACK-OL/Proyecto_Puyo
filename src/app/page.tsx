"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Sun, Moon } from "lucide-react";
import Link from "next/link";
import TicketCard from "@/components/TicketCard";
import { Incidencia } from "@/types";

export default function Home() {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchIncidencias = async () => {
    const [res, authRes] = await Promise.all([
      fetch("/api/incidencias"),
      fetch("/api/auth/me")
    ]);
    
    if (res.ok) {
      const data = await res.json();
      setIncidencias(data);
    }
    
    if (authRes.ok) {
      const user = await authRes.json();
      if (user?.rol === 'ADMIN') setIsAdmin(true);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchIncidencias();
  }, []);

  const marcarResuelto = async (id: number) => {
    const res = await fetch(`/api/incidencias/${id}`, { method: "PATCH" });
    if (res.ok) {
      fetchIncidencias();
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center mt-32 space-y-4">
      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-800 rounded-full animate-spin"></div>
      <div className="text-lg text-blue-800 font-medium">Sincronizando datos...</div>
    </div>
  );

  const turnomanana = incidencias.filter(i => i.usuario?.turno === 'MANANA');
  const turnotarde = incidencias.filter(i => i.usuario?.turno === 'TARDE');

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col mb-12 border-b border-blue-100 pb-8">
        <h2 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight mb-3">
          Panel de Control
        </h2>
        <p className="text-blue-800/80 text-lg max-w-2xl font-medium">
          Supervisa el estado de aulas y laboratorios ordenados por turno.
        </p>
      </div>

      {incidencias.length === 0 ? (
        <div className="text-center premium-card p-16 rounded-3xl border-t-4 border-t-blue-800">
          <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-blue-600" />
          </div>
          <h3 className="text-3xl font-extrabold text-blue-950 mb-3">Sistemas al 100%</h3>
          <p className="text-blue-800/80 text-lg mb-8 max-w-md mx-auto">
            Todo funciona a la perfección en las instalaciones. No hay incidencias reportadas en este momento.
          </p>
          <Link href="/reportar" className="inline-block bg-blue-800 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-900 shadow-md hover:shadow-lg transition-all">
            Crear Nuevo Reporte
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Turno Mañana */}
          <div>
            <h3 className="text-2xl font-black text-blue-950 mb-6 flex items-center gap-2 border-b-2 border-amber-200 pb-2 w-fit">
              <Sun size={28} className="text-amber-500"/> Turno Mañana 
              <span className="bg-amber-100 text-amber-700 text-sm px-2 py-0.5 rounded-full ml-2">{turnomanana.length}</span>
            </h3>
            {turnomanana.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {turnomanana.map((incidencia) => (
                  <TicketCard key={incidencia.id} incidencia={incidencia} onResolver={marcarResuelto} isAdmin={isAdmin} />
                ))}
              </div>
            ) : (
              <p className="text-blue-800/50 italic bg-blue-50/50 p-6 rounded-2xl border border-blue-50">No hay incidencias reportadas en el turno mañana.</p>
            )}
          </div>

          {/* Turno Tarde */}
          <div>
            <h3 className="text-2xl font-black text-blue-950 mb-6 flex items-center gap-2 border-b-2 border-indigo-200 pb-2 w-fit">
              <Moon size={28} className="text-indigo-500"/> Turno Tarde
              <span className="bg-indigo-100 text-indigo-700 text-sm px-2 py-0.5 rounded-full ml-2">{turnotarde.length}</span>
            </h3>
            {turnotarde.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {turnotarde.map((incidencia) => (
                  <TicketCard key={incidencia.id} incidencia={incidencia} onResolver={marcarResuelto} isAdmin={isAdmin} />
                ))}
              </div>
            ) : (
              <p className="text-blue-800/50 italic bg-blue-50/50 p-6 rounded-2xl border border-blue-50">No hay incidencias reportadas en el turno tarde.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
