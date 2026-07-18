-- ============================================================================
-- SCRIPT DE MIGRACIÓN INCREMENTAL 002: TABLAS UBICACION Y NOTIFICACION
-- Cumplimiento de Reglas 4 y 8: Índices optimizados y sin bloqueos exclusivos de tabla.
-- ============================================================================

CREATE TABLE IF NOT EXISTS "Ubicacion" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ubicacion_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Ubicacion_nombre_key" ON "Ubicacion"("nombre");
CREATE INDEX IF NOT EXISTS "Ubicacion_activo_nombre_idx" ON "Ubicacion"("activo", "nombre");

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
