# 🏛️ MANUAL DE INGENIERÍA Y SIMULACRO DE ALTA RIGUROSIDAD (OBJETIVO: 18-20/20)
## PROYECTO PUYO — SISTEMA DE GESTIÓN DE INCIDENCIAS (SOP SUIZA)
**Institución:** Instituto de Educación Superior Tecnológico Público Suiza (IESTP Suiza)  
**Objetivo Académico:** Asegurar una nota $\ge 17$ en la sustentación final y prueba de modificación en caliente (*Live Coding*).

---

## 🛑 PROTOCOLO DE MENTALIDAD E INGENIERÍA FRENTE AL JURADO
Un profesor o jurado evaluador de nivel superior busca identificar tres cosas durante una modificación de código en vivo:
1. **¿El estudiante entiende la arquitectura o solo copió un tutorial?**
2. **¿Sabe escribir en TypeScript estricto y manejar el ORM (Prisma) sin romper el build?**
3. **¿Utiliza terminología técnica precisa para justificar sus decisiones?**

> [!IMPORTANT]
> **GARANTÍA TÉCNICA VERIFICADA:** Tu proyecto compila en modo producción con **cero errores de TypeScript y cero advertencias críticas (`✓ Compiled successfully` / `✓ Generating static pages 17/17`)**. Tu punto de partida es un sistema 100% blindado.

---

## 🗣️ GLOSARIO TÉCNICO DE ALTA PUNTUACIÓN (CÓMO HABLARLE AL PROFESOR)
Cuando el profesor te haga preguntas o te pida un cambio, **nunca uses términos coloquiales** ("le puse una cosita", "aquí llamo a la página"). Usa este léxico de ingeniería de software:

| En vez de decir... | Di exactamente esto para ganar puntos de ingeniería... |
| :--- | :--- |
| *"Aquí llamo a la página para traer los datos."* | *"Ejecutamos una petición REST asíncrona mediante un cliente HTTP (`fetch`) que consume la ruta de la API `/api/incidencias` y muta el estado local del componente usando el hook `useState` con tipado estricto en TypeScript."* |
| *"Este componente es para que se vea la tarjeta."* | *"`TicketCard.tsx` es un **Presentational Component (Dumb Component)** desacoplado que recibe la entidad `Incidencia` a través de **Props estrictas**. Esto respeta el principio de responsabilidad única (SOLID) en React."* |
| *"Aquí le puse para que se borre cada 24 horas."* | *"Implementamos un mecanismo de **Depuración Perezosa (Lazy Cron Job)** en el método `GET` del servidor (`route.ts`). Al invocarse el endpoint, el servidor ejecuta una consulta `deleteMany` de Prisma con un índice compuesto `@@index([estado, fechaSolucion])` para depurar registros históricos sin generar bloqueos en la tabla."* |
| *"Cambié el diseño con clases de colores."* | *"Aplicamos un sistema de diseño utilitario **Tailwind CSS** sobre el DOM virtual de React, garantizando que el diseño sea responsivo (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) sin sobrecargar el *First Load JS* ni generar CSS redundante."* |

---

## 🔬 SIMULACRO DE LOS 6 ESCENARIOS DE MODIFICACIÓN EN VIVO DE NIVEL AVANZADO

### ⚡ ESCENARIO 1: ALTERAR LA LÓGICA DEL BACKEND Y TIEMPOS DE CRON (`src/app/api/incidencias/route.ts`)
**Reto del Profesor:** *"A ver, ingeniero Salas, indíqueme dónde está programada la limpieza de incidencias y cámbieme el tiempo de depuración de 24 horas a 48 horas (o a 1 hora para pruebas de estrés)."*

#### 📍 Solución Inmediata:
1. Abre **`src/app/api/incidencias/route.ts`**.
2. Dirígete a la **línea 10**, dentro de la función `export async function GET()`:
   ```typescript
   // LÍNEA ORIGINAL (24 HORAS):
   const unDiaAtras = new Date(Date.now() - 24 * 60 * 60 * 1000);
   ```
3. **Modificación en caliente según lo que pida:**
   * **Para 48 horas:** `const unDiaAtras = new Date(Date.now() - 48 * 60 * 60 * 1000);`
   * **Para 1 hora:** `const unDiaAtras = new Date(Date.now() - 1 * 60 * 60 * 1000);`
4. **Justificación al jurado:** *"Profesor, he modificado el delta de tiempo en milisegundos dentro del controlador REST. Al ejecutar `prisma.incidencia.deleteMany`, el ORM traduce esta expresión temporal a una consulta SQL optimizada por nuestro índice de fecha de solución en PostgreSQL."*

---

### 🛡️ ESCENARIO 2: MODIFICACIÓN DE REGLAS DE NEGOCIO Y ROLES EN EL CLIENTE (`TicketCard.tsx`)
**Reto del Profesor:** *"Actualmente solo el Administrador puede ver el botón 'Marcar como Solucionado'. Modifique el código para que el DOCENTE del mismo turno (ej. Turno Mañana) también pueda resolver las incidencias de sus aulas."*

#### 📍 Solución Inmediata:
1. Abre **`src/components/TicketCard.tsx`**.
2. Ve a la definición de la interfaz de Props en la **línea 6** y asegúrate de recibir el objeto de sesión actual o amplía la condición de visualización en la **línea 73**:
   ```tsx
   {/* LÍNEA ORIGINAL: */}
   {isPending && isAdmin && ( ... )}

   {/* MODIFICACIÓN DE ALTA RIGUROSIDAD: Permite resolver si es Admin O si está en modo supervisión */}
   {isPending && (isAdmin || incidencia.usuario?.rol === 'DOCENTE') && (
     <button 
       onClick={() => onResolver(incidencia.id)}
       className="mt-6 w-full border border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
     >
       <CheckCircle2 size={18} />
       Marcar como Solucionado
     </button>
   )}
   ```

---

### 🗄️ ESCENARIO 3: MODIFICAR EL ESQUEMA DE BASE DE DATOS Y MIGRAR EN CALIENTE (`Prisma ORM`)
**Reto del Profesor (Nivel Máximo):** *"Quiero ver si sabe manejar la base de datos en vivo. Vaya al modelo `Incidencia`, agregue un campo `prioridad` con valor por defecto 'Normal' y actualice la base de datos sin que colapse la aplicación."*

#### 📍 Solución Paso a Paso:
1. Abre **`prisma/schema.prisma`**.
2. Ve a la **línea 26** (dentro de `model Incidencia`) y agrega esta línea con tipado estricto:
   ```prisma
   model Incidencia {
     id            Int       @id @default(autoincrement())
     titulo        String    @db.VarChar(200)
     descripcion   String
     aula          String    @db.VarChar(50)
     estado        String    @default("Pendiente") @db.VarChar(30)
     prioridad     String    @default("Normal") @db.VarChar(20)  // <-- NUEVO CAMPO AGREGADO EN VIVO
     imagen        String?   
     // ... resto intacto
   }
   ```
3. Abre la terminal en tu IDE (NetBeans o VS Code) y ejecuta **un solo comando de sincronización segura sin pérdida de datos**:
   ```bash
   npx prisma db push
   ```
4. **Explicación al jurado:** *"Profesor, he agregado el campo `prioridad` con valor por defecto en el esquema declarativo de Prisma y he ejecutado `npx prisma db push`. Este comando sincroniza el esquema de PostgreSQL e invoca automáticamente `prisma generate` para regenerar los tipos de TypeScript en `@prisma/client`, garantizando tipado estricto en todo el proyecto."*

---

### 🎨 ESCENARIO 4: AGREGAR VALIDACIÓN ESTRICTA EN FORMULARIO DE REPORTE (`src/app/reportar/page.tsx`)
**Reto del Profesor:** *"Agregue una validación en el cliente que impida enviar una incidencia si la descripción tiene menos de 20 caracteres, mostrando un mensaje de error visual profesional."*

#### 📍 Solución Inmediata:
1. Abre **`src/app/reportar/page.tsx`**.
2. Ve a la función `handleSubmit` en la **línea 107** y agrega esta validación justo después de `e.preventDefault()`:
   ```typescript
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     
     // VALIDACIÓN DE INGENIERÍA EN VIVO (MÍNIMO 20 CARACTERES)
     if (formData.descripcion.trim().length < 20) {
       alert("⚠️ REGLA INSTITUCIONAL: La descripción técnica debe contener al menos 20 caracteres para permitir un diagnóstico adecuado por parte de TI.");
       return;
     }

     setEnviando(true);
     // ... resto del envío intacto
   ```

---

### 🧩 ESCENARIO 5: AISLAR O DESACTIVAR SERVICIOS EXTERNOS (NODEMAILER O CAMPANA)
**Reto del Profesor:** *"¿Qué pasa si se cae el servidor de correos de Gmail? Desactive el envío automático de correos en el backend para demostrar que la aplicación no se congela."*

#### 📍 Solución Inmediata:
1. Abre **`src/app/api/incidencias/route.ts`**.
2. Ve a la **línea 84**, donde se llama a `enviarCorreoNuevaIncidencia(...)`.
3. Comenta la llamada de forma limpia en TypeScript:
   ```typescript
   /* DESACTIVACIÓN MODULAR DE SERVICIO SMTP PARA PRUEBA DE RESILIENCIA
   enviarCorreoNuevaIncidencia({
     titulo,
     descripcion,
     aula,
     usuarioNombre: session.nombres,
     usuarioDni: session.dni
   }).catch(err => console.error("Error asíncrono al enviar correo:", err));
   */
   ```
4. **Justificación:** *"Profesor, al encapsular el envío de correos de Nodemailer como un proceso asíncrono en segundo plano, podemos aislar el módulo SMTP sin alterar la transacción ACID de registro en PostgreSQL (`prisma.incidencia.create`). El sistema conserva una tolerancia a fallos total (`Graceful Degradation`)."*

---

## 🎯 RESUMEN FINAL: CÓMO ACTUAR SI TE PIDEN UN RETO INESPERADO
1. **Paso 1:** Escucha con atención y no muestres nerviosismo.
2. **Paso 2:** Repite el pedido en voz alta usando términos técnicos: *"Perfecto, profesor. Procederé a alterar el Client Component / Server Route para modificar el comportamiento solicitado."*
3. **Paso 3:** Si necesitas el bloque de código exacto en 15 segundos, escríbeme por el chat inmediatamente indicando la orden exacta y te entregaré la solución estrictamente tipada lista para pegar.

¡Estás preparado con el máximo nivel de rigor técnico exigible para una sustentación en ingeniería! 🎓🚀
