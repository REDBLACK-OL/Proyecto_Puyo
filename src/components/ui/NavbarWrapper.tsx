"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // No mostrar el Navbar superior en la página de inicio de sesión (/login)
  if (pathname === "/login") {
    return null;
  }

  return <>{children}</>;
}
