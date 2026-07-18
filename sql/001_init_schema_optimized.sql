-- ============================================================================
-- SCRIPT DE MIGRACIÓN INCREMENTAL & CREACIÓN DE BASE DE DATOS
-- Proyecto Puyo - Sistema de Gestión de Incidencias (incidencias_suiza)
-- Cumplimiento de Reglas 4 y 8: Índices en FKs, optimización de tipos y sin bloqueos de tabla.
-- ============================================================================

-- 1. Creación de Tabla Usuario (si no existe)
CREATE TABLE IF NOT EXISTS "Usuario" (
    "id" SERIAL NOT NULL,
    "dni" VARCHAR(20) NOT NULL,
    "nombres" VARCHAR(150) NOT NULL,
    "rol" VARCHAR(20) NOT NULL DEFAULT 'USER',
    "turno" VARCHAR(20) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- 2. Creación de Tabla Incidencia (si no existe)
CREATE TABLE IF NOT EXISTS "Incidencia" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "aula" VARCHAR(50) NOT NULL,
    "estado" VARCHAR(30) NOT NULL DEFAULT 'Pendiente',
    "imagen" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaSolucion" TIMESTAMP(3),
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Incidencia_pkey" PRIMARY KEY ("id")
);

-- 3. Índice Único en DNI de Usuario
CREATE UNIQUE INDEX IF NOT EXISTS "Usuario_dni_key" ON "Usuario"("dni");

-- 4. Índice de Ordenamiento por Fecha en Usuario (Evita Full Table Scan en paginación/listados)
CREATE INDEX IF NOT EXISTS "Usuario_fecha_idx" ON "Usuario"("fecha" DESC);

-- 5. ÍNDICE EN LLAVE FORÁNEA (Obligatorio - Regla 4)
-- Optimiza JOINS y verificaciones de integridad referencial.
CREATE INDEX IF NOT EXISTS "Incidencia_usuarioId_idx" ON "Incidencia"("usuarioId");

-- 6. ÍNDICE COMPUESTO PARA LIMPIEZA CRON (Obligatorio - Regla 4)
-- Optimiza el borrado automático de incidencias solucionadas pasadas 24 hrs.
CREATE INDEX IF NOT EXISTS "Incidencia_estado_fechaSolucion_idx" ON "Incidencia"("estado", "fechaSolucion");

-- 7. Índice de Ordenamiento por Fecha en Incidencia
CREATE INDEX IF NOT EXISTS "Incidencia_fecha_idx" ON "Incidencia"("fecha" DESC);

-- 8. Definición de Llave Foránea (con restricción RESTRICT para evitar borrado en cascada inseguro)
DO $$ BEGIN
    ALTER TABLE "Incidencia" ADD CONSTRAINT "Incidencia_usuarioId_fkey" 
    FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 9. Creación de Tabla Ubicacion
CREATE TABLE IF NOT EXISTS "Ubicacion" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ubicacion_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Ubicacion_nombre_key" ON "Ubicacion"("nombre");
CREATE INDEX IF NOT EXISTS "Ubicacion_activo_nombre_idx" ON "Ubicacion"("activo", "nombre");

-- 10. Creación de Tabla Notificacion
CREATE TABLE IF NOT EXISTS "Notificacion" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "mensaje" TEXT NOT NULL,
    "tipo" VARCHAR(30) NOT NULL DEFAULT 'INCIDENCIA',
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "incidenciaId" INTEGER,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "Notificacion_leido_fecha_idx" ON "Notificacion"("leido", "fecha");
CREATE INDEX IF NOT EXISTS "Notificacion_incidenciaId_idx" ON "Notificacion"("incidenciaId");
