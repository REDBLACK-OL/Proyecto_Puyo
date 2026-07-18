# WORKING-CONTEXT.md (Proyecto Puyo - Sistema de Gestión de Incidencias)

> **Proyecto Activo:** Proyecto Puyo — Sistema de Gestión de Incidencias (incidencias_suiza).
> **Directorio del Proyecto:** `C:\Users\Geric\Desktop\WorkSpace\Proyecto_Puyo`
> **Fecha de Sincronización:** 18 de Julio de 2026.
> **Equipo de Desarrollo:**
> - Jacobo Martel, Luz Lizbeth (Líder y Directora General del Proyecto)
> - Melgarejo Huaman, Anllely Sileny
> - Macedo Macedo, Cristiam Saul
> - Rodriguez Cari, Christian Jhoel
> - Salas Ormeño, Geric Aldair

---

## Resumen del Estado y Stack
- **Backend / ORM:** Next.js 14 App Router (`/src/app/api/...`), Prisma ORM (`@prisma/client`), PostgreSQL.
- **Frontend:** Next.js + React + Tailwind CSS (`tailwind.config.ts`).
- **Autenticación:** Sesiones en Cookies vía `JWT_SECRET` (`@/lib/auth`).
- **Archivos Subidos:** Almacenamiento local en `public/uploads`.

## Estructura de la Base de Datos (`incidencias_suiza`)
1. **Model `Usuario`:**
   - Campos: `id` (PK, autoincrement), `dni` (Unique), `nombres`, `rol` (`ADMIN` | `USER`), `turno` (`MANANA` | `TARDE`), `fecha`.
   - Índices requeridos por Regla 4: `dni` (único), índice en `fecha` para paginación/ordenamiento rápido.
2. **Model `Incidencia`:**
   - Campos: `id` (PK), `titulo`, `descripcion`, `aula`, `estado` (`Pendiente`, `Solucionado`), `imagen` (rutas separadas por coma), `fecha`, `fechaSolucion`, `usuarioId` (FK hacia `Usuario.id`).
   - Índices obligatorios por Regla 4: 
     - FK `@@index([usuarioId])` para evitar sequential scans en joins y verificaciones referenciales.
     - Compuesto `@@index([estado, fechaSolucion])` para el Cron de limpieza automática (`deleteMany` en `api/incidencias/route.ts`).
     - Índice `@@index([fecha])` para consultas `findMany` ordenadas por fecha.

## Reglas y Protocolos Activos
- **Regla 1 (Memoria Local):** Este archivo `WORKING-CONTEXT.md` es la referencia obligatoria para el contexto de Proyecto Puyo.
- **Regla 4 & 8 (Patrones PostgreSQL y Migraciones Seguras):** Prohibido generar tablas/queries sin índices en llaves foráneas (`usuarioId`) y sin optimización. Todo cambio requiere script incremental y script de rollback sin bloqueos exclusivos (`Table Lock`).
- **Regla 7 (IDD):** Declarar intención e identificar ambigüedades (credenciales de BD, puertos) antes de ejecutar.
- **Regla 6 & 9 (Bucle de Validación y Casos Extremos):** Auditar conexiones agotadas, nulos (`imagen`, `fechaSolucion`) y desbordamientos.
