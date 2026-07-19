-- ============================================================================
-- SCRIPT DE ROLLBACK DE MIGRACIÓN
-- Proyecto Puyo - Sistema de Gestión de Incidencias (incidencias_suiza)
-- Cumplimiento de Regla 8: Rollback seguro por si la migración falla.
-- ============================================================================

-- Nota: Ejecutar este script únicamente si se requiere revertir la migración inicial 001.

DO $$ BEGIN
    ALTER TABLE IF EXISTS "Incidencia" DROP CONSTRAINT IF EXISTS "Incidencia_usuarioId_fkey";
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

DROP INDEX CONCURRENTLY IF EXISTS "Incidencia_fecha_idx";
DROP INDEX CONCURRENTLY IF EXISTS "Incidencia_estado_fechaSolucion_idx";
DROP INDEX CONCURRENTLY IF EXISTS "Incidencia_usuarioId_idx";
DROP INDEX CONCURRENTLY IF EXISTS "Usuario_fecha_idx";
DROP INDEX CONCURRENTLY IF EXISTS "Usuario_dni_key";

DROP TABLE IF EXISTS "Incidencia";
DROP TABLE IF EXISTS "Usuario";
