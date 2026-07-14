import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Portal de Incidencias - IESTP Suiza",
  description: "Sistema para reportar incidencias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-slate-50">
        <Navbar />
        <main className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-80px)]">
          {children}
        </main>
      </body>
    </html>
  );
}
