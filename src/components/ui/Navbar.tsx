import Image from "next/image";
import Link from "next/link";
import { PlusCircle, Building2, Users, LogOut } from "lucide-react";
import { getSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const user = await getSession();

  return (
    <nav className="bg-blue-900 sticky top-0 z-50 border-b border-blue-950 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative">
            <div className="bg-white p-1 rounded-full relative border border-blue-800 shadow-sm group-hover:shadow-lg transition-shadow">
              <Image src="/Logo-suiza.png" alt="Logo Suiza" width={48} height={48} className="rounded-full object-contain" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              IESTP Suiza <Building2 size={18} className="text-red-500" />
            </h1>
            <p className="text-xs text-blue-200 font-bold tracking-widest uppercase mt-0.5">Portal de Incidencias</p>
          </div>
        </Link>
        <div className="flex gap-2 sm:gap-6 items-center">
          {user && (
            <div className="hidden md:flex flex-col text-right mr-4">
              <span className="text-sm font-bold text-white">{user.nombres}</span>
              <span className="text-xs text-blue-300 bg-blue-800/50 px-2 py-0.5 rounded-full inline-block mt-1 w-fit ml-auto">
                {user.rol === 'ADMIN' 
                  ? 'Administrador' 
                  : user.rol === 'DOCENTE' 
                    ? `Docente - Turno ${user.turno}` 
                    : `Estudiante - Turno ${user.turno}`}
              </span>
            </div>
          )}

          <Link href="/" className="text-sm font-bold text-blue-100 hover:text-white px-3 py-2 rounded-lg transition-colors hover:bg-blue-800">
            Tablero
          </Link>
          
          {user?.rol === 'ADMIN' && (
            <Link href="/admin/usuarios" className="text-sm font-bold text-blue-100 hover:text-white px-3 py-2 rounded-lg transition-colors hover:bg-blue-800 flex items-center gap-2">
              <Users size={16} /> Usuarios
            </Link>
          )}

          <Link href="/reportar" className="flex items-center gap-2 bg-red-600 text-white font-bold px-5 py-2.5 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <PlusCircle size={18} />
            <span className="hidden sm:inline">Nuevo Reporte</span>
          </Link>

          {user && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
}
