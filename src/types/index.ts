export interface Usuario {
  id: number;
  dni: string;
  nombres: string;
  rol: string;
  turno: string;
}

export interface Incidencia {
  id: number;
  titulo: string;
  descripcion: string;
  aula: string;
  estado: string;
  usuarioId: number;
  usuario?: Usuario;
  imagen?: string | null;
  fecha: string | Date;
}
