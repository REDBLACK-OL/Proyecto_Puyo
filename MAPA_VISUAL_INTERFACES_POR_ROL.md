# 🗺️ MAPA EXACTO DE INTERFACES POR ROL (COORDENADAS VISUALES)
## PROYECTO PUYO — SISTEMA DE GESTIÓN DE INCIDENCIAS (SOP SUIZA)
> **GUÍA RÁPIDA DE UBICACIÓN:** Si el profesor te pide *"Agrégale tal cosa a la pantalla que ve el Administrador"* o *"Cambia algo en el tablero que ven los estudiantes"*, este documento te dice **exactamente a qué archivo de `src/app/` o `src/components/` debes entrar y en qué línea hacerlo**.

---

## 🏛️ RESUMEN DE RUTAS Y PANTALLAS POR ROL

| Ruta en el Navegador (`URL`) | Archivo de Código (`src/...`) | ¿Quién puede ver o entrar aquí? | ¿Qué se muestra en esta interfaz? |
| :--- | :--- | :---: | :--- |
| **`/login`** | `src/app/login/page.tsx` | Todos (`USER`, `DOCENTE`, `ADMIN`) | Ingreso por DNI. Si el DNI es de Administrador, se despliega la casilla de Contraseña. |
| **`/`** *(Tablero)* | `src/app/page.tsx` | Todos (`USER`, `DOCENTE`, `ADMIN`) | Las 2 columnas de incidencias: **Turno Mañana** y **Turno Tarde**. |
| **`/reportar`** | `src/app/reportar/page.tsx` | Todos (`USER`, `DOCENTE`, `ADMIN`) | Formulario para reportar averías (Título, Aula, Descripción, Subida de Fotos). |
| **`/admin/usuarios`** | `src/app/admin/usuarios/page.tsx` | **SOLO ADMINISTRADORES (`ADMIN`)** | Panel para crear, editar, eliminar estudiantes, docentes o administradores. |
| **`/admin/configuracion`** | `src/app/admin/configuracion/page.tsx` | **SOLO ADMINISTRADORES (`ADMIN`)** | Panel central para agregar, editar o quitar aulas del menú desplegable del instituto. |

---

## 🔍 DESGLOSE VISUAL Y DÓNDE HACER CAMBIOS EN CADA PANTALLA

### 1️⃣ INTERFAZ DEL TABLERO PRINCIPAL (`src/app/page.tsx`)
Esta es la primera pantalla que ven todos al entrar al sistema.
* **¿Qué hay en el archivo?** Maneja las dos columnas: `turnomanana` y `turnotarde`.
* **Si el profesor pide:** *"Agrégale un aviso general o un banner en la parte superior del tablero que lo vean todos (estudiantes, docentes y admin)"*.
  * 👉 **Entras a:** `src/app/page.tsx` (alrededor de la **línea 67**, justo debajo del título *"Panel de Control"*).
  * **Pegas este código:**
    ```tsx
    {/* BANNER DE AVISO EN EL TABLERO */}
    <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-600 rounded-r-xl text-blue-950 font-bold text-sm">
      📢 AVISO TI: El laboratorio de Redes N°3 estará en mantenimiento durante el turno tarde.
    </div>
    ```

---

### 2️⃣ INTERFAZ DE CADA TARJETA DE AVERÍA (`src/components/TicketCard.tsx`)
Las tarjetas que están adentro de las columnas del Tablero Principal no se dibujan en `page.tsx`, sino que tienen su propio archivo modular.
* **Diferencia por Rol dentro de la Tarjeta:**
  * **Estudiantes (`USER`) y Docentes (`DOCENTE`):** Ven el título, semáforo rojo/verde, fotos, aula, fecha y quién lo reportó.
  * **Administrador (`ADMIN`):** Ve exactamente lo mismo, **PERO en la parte inferior de la tarjeta se le activa el botón verde/azul `CheckCircle2: Marcar como Solucionado`**.
* **Si el profesor pide:** *"Agrégale un botón o campo dentro de cada tarjeta para todos los usuarios"*.
  * 👉 **Entras a:** `src/components/TicketCard.tsx` (alrededor de la **línea 71**, encima del botón del admin).

---

### 3️⃣ INTERFAZ DEL FORMULARIO DE REPORTE (`src/app/reportar/page.tsx`)
Donde los usuarios crean las incidencias técnicas.
* **Diferencia por Rol en esta pantalla:**
  * **Estudiantes (`USER`) y Docentes (`DOCENTE`):** Ven el select común de Aulas/Laboratorios (`<select name="aula">`).
  * **Administrador (`ADMIN`):** Ve el formulario común, **más un botón azul exclusivo que dice `⚙️ Administrar Ubicaciones (Admin)` en la línea 190**. Al hacerle clic, se abre una caja flotante dentro de la misma página para agregar o eliminar aulas en tiempo real sin salir.
* **Si el profesor pide:** *"Agrégale un texto de instrucción o un input al formulario de reportar"*.
  * 👉 **Entras a:** `src/app/reportar/page.tsx` (encima o debajo del `<textarea name="descripcion">` alrededor de la **línea 312**).

---

### 4️⃣ INTERFAZ DE GESTIÓN DE USUARIOS DEL ADMIN (`src/app/admin/usuarios/page.tsx`)
Pantalla exclusiva para el Administrador al hacer clic en `Usuarios` en la barra superior.
* **Estructura del archivo (`grid-cols-1 lg:grid-cols-3`):**
  * **Columna Izquierda (`lg:col-span-1` - línea 109):** Formulario con DNI, Nombres, Turno (Mañana/Tarde) y Rol (`USER`, `DOCENTE`, `ADMIN`) para registrar o editar una cuenta.
  * **Columna Derecha (`lg:col-span-2` - línea 159):** Lista de tarjetas con todos los usuarios registrados, cada uno con botón de `Editar` y `Eliminar`.
* **Si el profesor pide:** *"Agrega un contador arriba en el panel de usuarios que diga el total de cuentas registradas"*.
  * 👉 **Entras a:** `src/app/admin/usuarios/page.tsx` (alrededor de la **línea 104**, debajo del texto *"Panel exclusivo para administradores"*).
  * **Pegas este código:**
    ```tsx
    <div className="mt-3 bg-blue-900 text-white px-4 py-2 rounded-xl inline-block font-bold text-sm">
      Total de Usuarios Registrados: {usuarios.length}
    </div>
    ```

---

### 5️⃣ INTERFAZ DE CONFIGURACIÓN DEL ADMIN (`src/app/admin/configuracion/page.tsx`)
Pantalla maestra del Administrador al hacer clic en `Configuración` en la barra superior.
* **Estructura del archivo:**
  * **Tarjeta Izquierda (`lg:col-span-2` - línea 147):** Catálogo de Aulas y Laboratorios. Muestra un input con botón rojo `+ Agregar` y la tabla con todas las aulas para modificarlas en caliente.
  * **Tarjeta Derecha (línea 263):** Panel de Estado Operativo y Restablecimiento.
* **Si el profesor pide:** *"Agrégale un botón o tarjeta de resumen en el panel de configuración central del Administrador"*.
  * 👉 **Entras a:** `src/app/admin/configuracion/page.tsx` (alrededor de la **línea 143**, justo debajo del título principal *"Panel Maestro de Configuración"*).

---

### 6️⃣ BARRA SUPERIOR DE NAVEGACIÓN (`src/components/ui/Navbar.tsx`)
La barra azul oscuro que está fija al tope en todas las pantallas (`sticky top-0`).
* **Comportamiento por Rol (`user.rol`):**
  * **Estudiantes (`USER`) y Docentes (`DOCENTE`):** Solo ven su nombre, el botón `Tablero`, la `Campana de Notificaciones`, el botón `Nuevo Reporte` y `Cerrar Sesión`.
  * **Administrador (`ADMIN`):** Además de lo anterior, ve los botones exclusivos **`👥 Usuarios` y `⚙️ Configuración`** (líneas 47-56).
* **Si el profesor pide:** *"Cámbiale el color a la barra superior o agrégale un texto al lado del logo del instituto"*.
  * 👉 **Entras a:** `src/components/ui/Navbar.tsx` (línea 13 para colores de fondo, línea 22 para el título *IESTP Suiza*).
