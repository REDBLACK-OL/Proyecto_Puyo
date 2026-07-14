"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <button 
      onClick={handleLogout}
      className="ml-2 text-blue-300 hover:text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
      title="Cerrar Sesión"
    >
      <LogOut size={20} />
    </button>
  );
}
