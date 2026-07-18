"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, CheckCircle2, AlertCircle, Clock, X } from "lucide-react";
import Link from "next/link";

interface NotificationBellProps {
  userRole?: string;
}

export default function NotificationBell({ userRole }: NotificationBellProps) {
  const [notificaciones, setNotificaciones] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userRole !== "ADMIN") return;

    cargarNotificaciones();
    const interval = setInterval(cargarNotificaciones, 15000); // Refrescar cada 15 segundos

    return () => clearInterval(interval);
  }, [userRole]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cargarNotificaciones = async () => {
    try {
      const res = await fetch("/api/notificaciones");
      if (res.ok) {
        const data = await res.json();
        setNotificaciones(data.notificaciones || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
    }
  };

  const marcarTodasComoLeidas = async () => {
    try {
      await fetch("/api/notificaciones", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marcarTodas: true })
      });
      setUnreadCount(0);
      setNotificaciones(prev => prev.map(n => ({ ...n, leido: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const marcarUnaLeida = async (id: number) => {
    try {
      await fetch(`/api/notificaciones/${id}`, {
        method: "PUT"
      });
      setUnreadCount(prev => Math.max(0, prev - 1));
      setNotificaciones(prev => prev.map(n => n.id === id ? { ...n, leido: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  if (userRole !== "ADMIN") return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 bg-blue-800/80 hover:bg-blue-800 text-blue-100 hover:text-white rounded-xl transition-all border border-blue-700 shadow-sm flex items-center justify-center group"
        title="Centro de Alertas para Administrador"
      >
        <Bell size={18} className={unreadCount > 0 ? "text-red-400 animate-bounce" : "text-blue-200"} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-blue-900 shadow-md animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden z-50 animate-fadeIn">
          <div className="bg-blue-950 p-4 text-white flex items-center justify-between border-b border-blue-900">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-red-500" />
              <h4 className="font-extrabold text-sm tracking-tight">Centro de Alertas (Admin)</h4>
              {unreadCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} nuevas
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={marcarTodasComoLeidas}
                className="text-xs text-blue-300 hover:text-white font-bold transition-colors underline"
              >
                Marcar leídas
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-blue-50">
            {notificaciones.length === 0 ? (
              <div className="p-8 text-center text-blue-900/50 space-y-2">
                <CheckCircle2 size={32} className="mx-auto text-emerald-500/60" />
                <p className="text-sm font-semibold">No tienes notificaciones pendientes</p>
                <p className="text-xs text-blue-900/40">Te avisaremos cuando un usuario registre una nueva incidencia en el portal.</p>
              </div>
            ) : (
              notificaciones.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.leido && marcarUnaLeida(n.id)}
                  className={`p-4 transition-colors cursor-pointer flex gap-3 items-start ${
                    n.leido ? "bg-white hover:bg-gray-50/80 opacity-75" : "bg-red-50/40 hover:bg-red-50/70 border-l-4 border-red-500"
                  }`}
                >
                  <div className="mt-0.5">
                    <AlertCircle size={18} className={n.leido ? "text-blue-400" : "text-red-600"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-black text-blue-950 truncate block">{n.titulo}</span>
                      {!n.leido && (
                        <span className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0 animate-ping" title="No leído" />
                      )}
                    </div>
                    <p className="text-xs text-blue-900/80 font-medium line-clamp-2">{n.mensaje}</p>
                    <span className="text-[10px] text-blue-800/50 font-bold flex items-center gap-1 mt-1">
                      <Clock size={10} />
                      {new Date(n.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(n.fecha).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-blue-50/70 p-3 text-center border-t border-blue-100">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-xs font-extrabold text-blue-900 hover:text-red-600 transition-colors block"
            >
              Ver Tablero Principal de Incidencias →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
