-- ============================================================================
-- SCRIPT DE ROLLBACK 002: ELIMINAR TABLAS UBICACION Y NOTIFICACION
-- Cumplimiento de Reglas 4 y 8: Reversión segura sin bloqueo en producción.
-- ============================================================================

DROP INDEX IF EXISTS "Notificacion_incidenciaId_idx";
DROP INDEX IF EXISTS "Notificacion_leido_fecha_idx";
DROP TABLE IF EXISTS "Notificacion";

DROP INDEX IF EXISTS "Ubicacion_activo_nombre_idx";
DROP INDEX IF EXISTS "Ubicacion_nombre_key";
DROP TABLE IF EXISTS "Ubicacion";
