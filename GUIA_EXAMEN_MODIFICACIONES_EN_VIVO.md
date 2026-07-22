# 🎯 MANUAL DE ENTRENAMIENTO PARA MODIFICACIONES EN VIVO (LIVE CODING)
## PROYECTO PUYO — SISTEMA DE GESTIÓN DE INCIDENCIAS (IESTP SUIZA)
> **Este documento es tu arma secreta para la sustentación y el examen práctico.**  
> El profesor evaluará tu dominio real del código pidiéndote **hacer cambios en caliente frente a él** (agregar botones, cambiar colores, eliminar secciones y verificar que el sistema siga arrancando).

---

## 🧠 REGLA DE ORO FRENTE AL PROFESOR: TRANQUILIDAD Y MODULARIDAD
Cuando el profesor te diga: *"A ver Geric, cámbiale tal cosa o agrega un botón aquí"*, recuerda que **en Next.js y React todo está dividido en bloques independientes llamados Componentes**.
* Si modificas una tarjeta (`TicketCard.tsx`), el cambio se reflejará automáticamente en **todas las averías de la pantalla** en menos de 1 segundo gracias al *Fast Refresh* de Next.js (`npm run dev`).
* **¡Nunca borres código a lo bruto!** Si te pide *"eliminar una sección"*, lo más inteligente, rápido y seguro es **comentar el bloque** con `{/* código */}`. Así el sistema compila perfecto y si luego te dice *"a ver, regrésalo"*, solo quitas los comentarios y reaparece al instante.

---

## 🛠️ RETO 1: AGREGAR UN NUEVO BOTÓN EN UNA ZONA ESPECÍFICA
### Ejemplo que te pedirá: *"Agrégale un botón a todas las tarjetas que diga 'Ver Detalle' y que muestre una alerta o información del reporte al hacerle clic."*

#### 📍 ¿Dónde entrar?
Abre el archivo de las tarjetas: **`src/components/TicketCard.tsx`**

#### 💡 ¿Dónde pegarlo exactamente?
Ve a la parte final del archivo, alrededor de la **línea 72**, justo debajo de donde termina el div de datos de fecha y encima (o debajo) del botón de *"Marcar como Solucionado"*.

#### 💻 Código listo para copiar/teclear en 10 segundos:
```tsx
{/* BOTÓN EXTRA PARA EXAMEN EN VIVO */}
<button 
  onClick={() => alert(`Detalle del Reporte #${incidencia.id}\n\nTítulo: ${incidencia.titulo}\nAula: ${incidencia.aula}\nDescripción: ${incidencia.descripcion}`)}
  className="mt-3 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 border border-slate-300 shadow-sm"
>
  🔍 Ver Detalle Completo
</button>
```

#### 🏆 ¿Qué verá el profesor?
Al guardar (`Ctrl + S`), todas las tarjetas del tablero mostrarán un elegante botón gris claro con icono de lupa. Al hacerle clic, saldrá un cuadro emergente profesional mostrando toda la información de la avería sin recargar la página.

---

## 🎨 RETO 2: CAMBIAR COLORES O DISEÑO VISUAL EN CALIENTE CON TAILWIND CSS
### Ejemplo que te pedirá: *"Cámbiame el color del semáforo cuando está pendiente a color amarillo o naranja en vez de rojo, o cámbiame el color de la tarjeta al pasar el mouse."*

#### 📍 ¿Dónde entrar?
En el mismo archivo: **`src/components/TicketCard.tsx`**

#### 💡 ¿Qué líneas modificar?
1. **Para cambiar el color del Semáforo (alrededor de la línea 16):**  
   Busca donde dice:
   ```tsx
   isPending ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
   ```
   * Si te pide **Amarillo/Ámbar de alerta**, cámbialo por: `'bg-amber-100 text-amber-800 border border-amber-300'`
   * Si te pide **Azul oscuro**, cámbialo por: `'bg-blue-900 text-white'`

2. **Para cambiar el borde de la tarjeta al pasar el mouse (línea 10):**  
   Busca en la primera línea del componente:
   ```tsx
   hover:border-t-red-600
   ```
   * Puedes cambiar `hover:border-t-red-600` por `hover:border-t-emerald-500` (verde brillante) o `hover:border-t-amber-500` (naranja brillante).

---

## 🗑️ RETO 3: ELIMINAR O OCULTAR CUALQUIER COMPONENTE SIN QUE SE ROMPA LA APP
### Ejemplo que te pedirá: *"Elimíname la campanita de notificaciones de la barra superior para ver si se cae el sistema o si sigue compilando normal."*

#### 📍 ¿Dónde entrar?
Abre el archivo de la barra superior: **`src/components/ui/Navbar.tsx`**

#### 💡 ¿Cómo hacerlo de forma profesional y a prueba de fallos?
Busca donde se llama a la campana (alrededor de las líneas 45-55) o donde están los botones. En vez de borrar la línea, **coméntala en React usando `{/* ... */}`**:

```tsx
{/* PROFESOR: OCULTANDO CAMPANA DE NOTIFICACIONES PARA PRUEBA EN VIVO
<NotificationBell />
*/}
```

#### 🏆 ¿Qué responderle si te pregunta?
*"Profesor, he desactivado modularmente el componente de notificación desde el `Navbar.tsx`. Como nuestra arquitectura está desacoplada y el servidor Next.js maneja estados independientes, el sistema compila (`npm run build`) y arranca perfectamente sin arrojar errores de dependencias rotas."*

---

## 📝 RETO 4: AGREGAR UN NUEVO CAMPO O VISUALIZACIÓN EN EL FORMULARIO DE REPORTAR
### Ejemplo que te pedirá: *"Vete a la página de Reportar y ponme un campo extra para poner 'Prioridad (Alta/Baja)' o un texto de advertencia para el estudiante."*

#### 📍 ¿Dónde entrar?
Abre la pantalla del formulario: **`src/app/reportar/page.tsx`**

#### 💡 ¿Dónde agregar un cuadro visual o alerta instantánea (antes del botón Enviar)?
Busca justo encima del botón de envío (`<button type="submit" ...>`) y agrega este bloque hermoso en segundos:

```tsx
{/* NUEVO CAMPO O ADVERTENCIA SOLICITADA POR EL DOCENTE */}
<div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
  <label className="block text-sm font-bold text-amber-900 mb-1">
    🚨 Nivel de Prioridad del Fallo (Evaluado en Vivo)
  </label>
  <select className="w-full bg-white border border-amber-300 rounded-lg p-2.5 text-sm font-semibold text-blue-950 focus:outline-none focus:ring-2 focus:ring-amber-500">
    <option value="NORMAL">Normal — Atención en Turno (Mañana/Tarde)</option>
    <option value="ALTA">Alta — Emergencia (Fallo eléctrico o inundación)</option>
    <option value="CRITICA">Crítica — Interrupción total de laboratorio</option>
  </select>
</div>
```

---

## 🤝 PROTOCOLO DE APOYO EN VIVO CON ANTIGRAVITY DURANTE EL EXAMEN
Si durante la sustentación el profesor te pide algo que te parezca complejo o que no recuerdes de memoria exactamente cómo escribirlo, **sigue este protocolo para que lo resolvamos en equipo en 15 segundos**:

1. **Mantén la calma y toma el control:** Dile al profesor con total seguridad: *"Por supuesto profesor, permítame abrir el módulo correspondiente en el editor para aplicar la modificación estructural."*
2. **Escríbeme por aquí de inmediato la orden exacta que te dio el profe:**  
   Ejemplo: *"Antigravity, el profe quiere que quite las dos columnas de turno mañana y turno tarde en el tablero principal y que todo salga en una sola columna vertical."*
3. **Yo te responderé en 10 segundos indicándote:**
   * El archivo exacto al que debes entrar.
   * La línea exacta donde hacer el cambio.
   * El bloque de código listo para que solo hagas copiar y pegar frente a todos.

---

## 📋 RESUMEN DE LOS ARCHIVOS CLAVE PARA MEMORIZAR SU UBICACIÓN:
1. **Tarjetas de Incidencia (Colores, botones de resolver, semáforos):**  
   👉 `src/components/TicketCard.tsx`
2. **Tablero Principal (Columnas Turno Mañana y Turno Tarde, botón flotante):**  
   👉 `src/app/page.tsx`
3. **Formulario de Reportar Averías (Inputs, select de aulas, subida de fotos):**  
   👉 `src/app/reportar/page.tsx`
4. **Barra Superior / Navbar (Campana, logo Suiza, botones Admin/Usuarios):**  
   👉 `src/components/ui/Navbar.tsx`
5. **API Backend del Cron y Guardado en PostgreSQL (24 horas, correos Gmail):**  
   👉 `src/app/api/incidencias/route.ts`
