# 🚀 Guía de Instalación: Sistema de Gestión de Incidencias

¡Hola equipo! Sigan estos pasos **al pie de la letra** para que el proyecto funcione perfectamente en sus computadoras. Si se saltan un paso, les saldrán errores o faltarán archivos.

---

### ⚠️ Aclaración Importante sobre Archivos Ocultos
Cuando clonan un repositorio (o se pasan la carpeta por USB), hay archivos que **NUNCA se copian** por seguridad (como la carpeta `node_modules` y el archivo `.env`). Por eso deben reconstruirlos siguiendo estos pasos.

---

### 🛠️ PASO 1: Requisitos Previos
Antes de empezar, asegúrense de tener instalado:
1. **Node.js** (Versión 18 o superior).
2. **PostgreSQL** y **pgAdmin 4**.
3. **Visual Studio Code**.

---

### 📦 PASO 2: Instalar Dependencias
Abran la carpeta del proyecto en Visual Studio Code, abran una nueva Terminal (`Ctrl + ñ` o `Terminal > New Terminal`) y escriban:

```bash
npm install
```
*(Esto descargará la carpeta `node_modules` que contiene todas las librerías necesarias como React, Next.js, Prisma, etc).*

---

### 🗄️ PASO 3: Crear la Base de Datos y el Archivo .env
1. Abran **pgAdmin 4** y creen una base de datos vacía. Pueden llamarla `incidencias_suiza`.
2. En Visual Studio Code, creen un archivo nuevo en la raíz del proyecto (afuera de todo) y llámenlo exactamente **`.env`** (con el punto al inicio).
3. Peguen el siguiente código dentro del archivo `.env` y cambien los datos según su propia base de datos:

```env
# Reemplaza "postgres" y "tucontraseña" por tu usuario y contraseña de pgAdmin
# Reemplaza "incidencias_suiza" por el nombre que le pusiste a tu base de datos
DATABASE_URL="postgresql://postgres:tucontraseña@localhost:5432/incidencias_suiza?schema=public"

# Clave de seguridad para el Login (pueden dejar esta misma)
JWT_SECRET="clave_secreta_super_segura_suiza_2026"
```

---

### 📂 PASO 4: Crear la Carpeta de Fotos
Como la carpeta de subidas suele ignorarse al subir el proyecto, debemos crearla manualmente para que no dé error al intentar guardar fotos.
En la terminal escriban:

```bash
mkdir public\uploads
```
*(Si les da error, simplemente vayan a la carpeta `public`, den clic derecho, "Nueva Carpeta" y pónganle el nombre `uploads`).*

---

### 🏗️ PASO 5: Construir la Base de Datos
Ahora enviaremos la estructura de nuestras tablas a su PostgreSQL local. En la terminal ejecuten:

```bash
npx prisma db push
```

Luego, generamos el cliente para que el código reconozca la base de datos:

```bash
npx prisma generate
```

---

### 👤 PASO 6: Crear al Administrador (IMPORTANTE)
Como la base de datos está vacía, no podrán iniciar sesión. Ejecuten este comando para crear automáticamente al Administrador Maestro (Omar):

```bash
npx tsx prisma/seed.ts
```
*(Si este comando da error, significa que les falta el ejecutor TSX. Escriban `npm install -g tsx` y luego vuelvan a intentar el comando).*

---

### 💻 PASO 7: ¡Ejecutar el Sistema!
Ya está todo listo. Enciendan el servidor con:

```bash
npm run dev
```

1. Abran su navegador y vayan a **`http://localhost:3000`**
2. Inicien sesión con el DNI del Administrador Maestro:
   - **DNI:** `76866377`
3. ¡Vayan a la pestaña "Usuarios" y regístrense ustedes mismos!

---
**Nota para la sustentación:** Si el profesor les pregunta por qué no se pasó el archivo `.env`, deben responder que "por buenas prácticas de ciberseguridad, las credenciales de bases de datos nunca se suben al código fuente (repositorio), sino que se crean como Variables de Entorno locales". ¡Puntos extra asegurados! 🌟
