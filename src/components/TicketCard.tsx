import { CheckCircle2, Clock, MapPin, ImageIcon } from "lucide-react";
import { Incidencia } from "@/types";
import Image from "next/image";

export default function TicketCard({ incidencia, onResolver, isAdmin }: { incidencia: Incidencia, onResolver: (id: number) => void, isAdmin?: boolean }) {
  const isPending = incidencia.estado === 'Pendiente';

  return (
    <div className="premium-card rounded-2xl p-6 flex flex-col justify-between group overflow-hidden border-t-4 border-t-transparent hover:border-t-red-600">
      
      <div>
        <div className="flex justify-between items-start mb-5">
          <span className={`px-3 py-1 text-xs font-black tracking-wider uppercase rounded-full flex items-center gap-1.5 ${
            isPending 
              ? 'bg-red-50 text-red-700' 
              : 'bg-emerald-50 text-emerald-700'
          }`}>
            {isPending ? <Clock size={12} strokeWidth={3}/> : <CheckCircle2 size={12} strokeWidth={3}/>}
            {incidencia.estado}
          </span>
          <span className="text-xs text-blue-800 font-mono bg-blue-50 px-2 py-1 rounded-md border border-blue-100">#{String(incidencia.id).padStart(4, '0')}</span>
        </div>
        
        <h3 className="text-xl font-extrabold text-blue-950 mb-3 leading-tight group-hover:text-red-600 transition-colors">{incidencia.titulo}</h3>
        <p className="text-blue-900/80 text-sm mb-4 line-clamp-3 leading-relaxed">{incidencia.descripcion}</p>
        
        {incidencia.imagen && (
          <div className={`mb-5 grid gap-2 ${incidencia.imagen.split(',').length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {incidencia.imagen.split(',').map((imgUrl, index) => (
              <div key={index} className={`relative w-full rounded-xl overflow-hidden border border-blue-100 shadow-sm group-hover:shadow-md transition-all duration-300 ${incidencia.imagen!.split(',').length > 1 ? 'h-32' : 'h-48'}`}>
                <Image 
                  src={imgUrl} 
                  alt={`Evidencia ${index + 1}`} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {index === 0 && (
                  <div className="absolute top-2 right-2 bg-blue-950/70 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg border border-white/10">
                    <ImageIcon size={12} /> {incidencia.imagen!.split(',').length > 1 ? `+${incidencia.imagen!.split(',').length} Fotos` : 'Evidencia'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2.5 text-sm mb-3 bg-blue-50/50 p-2.5 rounded-lg border border-blue-50">
          <MapPin size={16} className={isPending ? "text-red-600" : "text-emerald-600"}/>
          <span className="font-semibold text-blue-950">{incidencia.aula}</span>
        </div>
        
        <div className="text-xs text-blue-800/60 mt-5 pt-4 border-t border-blue-50">
          <div className="flex justify-between items-end">
            <div>
              <span className="block mb-1 text-blue-800/80">Reportado por:</span>
              <strong className="text-blue-950 text-sm">{incidencia.usuario?.nombres || 'Usuario'}</strong>
            </div>
            <div className="text-right">
              <span className="block mb-1 text-blue-800/80">Fecha:</span>
              <span className="text-blue-900/80 font-mono">
                {new Date(incidencia.fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isPending && isAdmin && (
        <button 
          onClick={() => onResolver(incidencia.id)}
          className="mt-6 w-full border border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <CheckCircle2 size={18} />
          Marcar como Solucionado
        </button>
      )}
    </div>
  );
}
