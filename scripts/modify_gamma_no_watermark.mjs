import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPptx = path.join(__dirname, '..', 'Sistema-Operativo-y-de-Soporte (2)-no-watermark.pptx');
const outputPptx = path.join(__dirname, '..', 'SOP-Suiza-Final-PalabrasClave.pptx');

const zip = new AdmZip(inputPptx);

// Función auxiliar para reemplazar un texto específico dentro del contenido XML de un slide
function replaceExactText(content, targetText, replacementText) {
  // Buscamos la coincidencia de <a:t>targetText</a:t> o secuencias
  const escapedTarget = targetText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`<a:t>${escapedTarget}</a:t>`, 'g');
  if (regex.test(content)) {
    return content.replace(regex, `<a:t>${replacementText}</a:t>`);
  }
  return content;
}

// SLIDE 2: El Problema (Poca letra / viñetas cortas)
let slide2 = zip.readAsText('ppt/slides/slide2.xml', 'utf8');
slide2 = replaceExactText(slide2, 'Interrumpen las clases prácticas y obligan a suspender actividades en pleno desarrollo de la sesión.', '• Interrupción de clases prácticas y pérdida de continuidad del aprendizaje en aula.');
slide2 = replaceExactText(slide2, 'Esto afecta directamente el aprendizaje, porque el estudiante pierde tiempo de práctica y continuidad en el trabajo.', '• Equipos inactivos generan retrasos en talleres y laboratorios especializados.');
slide2 = replaceExactText(slide2, 'Sin un registro centralizado, los reportes se pierden con facilidad, se olvidan o terminan traspapelados.', '• Avisos de palabra que no dejan constancia, fecha ni responsable de atención.');
slide2 = replaceExactText(slide2, 'Eso dificulta el seguimiento de incidencias y retrasa la atención de los problemas detectados.', '• Imposibilidad de auditar y priorizar reparaciones de forma ordenada.');
slide2 = replaceExactText(slide2, 'La información no se comunica bien entre turnos, por lo que cada equipo empieza sin conocer el estado real de las incidencias.', '• Falta de comunicación entre Turno Mañana y Turno Tarde que demora arreglos urgentes.');
slide2 = replaceExactText(slide2, 'Esto genera demoras, repeticiones y una respuesta más lenta ante los problemas operativos.', '• El técnico entrante desconoce las reparaciones pendientes del turno anterior.');
slide2 = replaceExactText(slide2, 'Reportes tarde.', '• Retrasos en atención.');
zip.updateFile('ppt/slides/slide2.xml', Buffer.from(slide2, 'utf8'));

// SLIDE 3: La Propuesta (Palabras clave)
let slide3 = zip.readAsText('ppt/slides/slide3.xml', 'utf8');
slide3 = replaceExactText(slide3, 'SOP Suiza es una plataforma web diseñada para centralizar la gestión de fallas, desde el primer reporte hasta el cierre del caso.', 'Aplicación web en red para supervisión, control de tarjetas y gestión de usuarios.');
slide3 = replaceExactText(slide3, 'Permite organizar la supervisión y el control operativo en un solo lugar, de forma rápida y visible.', 'Plataforma rápida accesible en cualquier navegador en tiempo real.');
slide3 = replaceExactText(slide3, 'Estudiantes y docentes inician sesión con DNI.', '• Acceso inmediato en segundos con número de DNI.');
slide3 = replaceExactText(slide3, 'Desde cualquier dispositivo pueden reportar la falla en pocos pasos.', '• Cero digitación innecesaria en computadoras y móviles.');
slide3 = replaceExactText(slide3, 'Cada falla aparece como una tarjeta visual con título y descripción.', '• Tarjeta dinámica con título, descripción y síntoma en pantalla.');
slide3 = replaceExactText(slide3, 'También incluye el ambiente afectado y quién realizó el reporte.', '• Identificación del ambiente exacto y persona reportante.');
slide3 = replaceExactText(slide3, 'El técnico ve los pendientes en tiempo real para dar seguimiento oportuno.', '• Visualización activa para priorizar la atención técnica en laboratorios.');
slide3 = replaceExactText(slide3, 'Al cerrar el caso, registra la fecha y hora exacta de solución.', '• Botón de cierre que sella la fecha y hora exacta de la reparación.');
zip.updateFile('ppt/slides/slide3.xml', Buffer.from(slide3, 'utf8'));

// SLIDE 4: Tablero Dinámico por Turnos (Palabras clave)
let slide4 = zip.readAsText('ppt/slides/slide4.xml', 'utf8');
slide4 = replaceExactText(slide4, 'Divide Turno Mañana y Turno Tarde para ver cada reporte con claridad.', '• Pantalla dividida en dos columnas: Turno Mañana y Turno Tarde. Relevo ordenado.');
zip.updateFile('ppt/slides/slide4.xml', Buffer.from(slide4, 'utf8'));

// SLIDE 5: Registro Ágil (Palabras clave)
let slide5 = zip.readAsText('ppt/slides/slide5.xml', 'utf8');
slide5 = replaceExactText(slide5, 'Solo se completa el título y la descripción del problema.', '• Formulario en 2 clics: Título breve del problema y descripción del síntoma.');
slide5 = replaceExactText(slide5, 'El sistema toma automáticamente el DNI, los nombres y el turno del usuario.', '• Identidad en automático: DNI, nombres completos y turno sin digitación.');
slide5 = replaceExactText(slide5, 'El selector incluye Laboratorio de Cómputo, Taller de Electrónica, Taller de Mecánica, Aula 101 y Biblioteca.', '• Selector oficial: Lab de Cómputo 1, 2 y 3, Electrónica, Mecánica, Aula 101 y Biblioteca.');
slide5 = replaceExactText(slide5, 'Esto permite ubicar cada incidente con precisión y estandarizar el registro.', '• Ubicación exacta del fallo para el desplazamiento inmediato del soporte técnico.');
zip.updateFile('ppt/slides/slide5.xml', Buffer.from(slide5, 'utf8'));

// SLIDE 6: Evidencia Fotográfica Múltiple (Palabras clave)
let slide6 = zip.readAsText('ppt/slides/slide6.xml', 'utf8');
slide6 = replaceExactText(slide6, 'El formulario permite adjuntar múltiples fotografías del equipo dañado.', '• Subida de fotografías simultáneas: mensajes de error, cables o piezas dañadas.');
slide6 = replaceExactText(slide6, 'Incluye pantalla con error, cables desconectados y otros indicios visibles para un diagnóstico más preciso.', '• Evidencia multimedia directa en cada reporte del sistema.');
slide6 = replaceExactText(slide6, 'El usuario ve una cuadrícula con las fotos cargadas antes de confirmar el envío.', '• Cuadrícula visual de previsualización antes de confirmar el reporte.');
slide6 = replaceExactText(slide6, 'Puede eliminar las imágenes que no se vean bien o que no aporten información útil.', '• Botón de eliminación individual por imagen para descartar capturas borrosas.');
slide6 = replaceExactText(slide6, 'El técnico revisa las fotos antes de salir para entender mejor la falla.', '• Diagnóstico previo: El técnico inspecciona fotos desde el tablero de control.');
slide6 = replaceExactText(slide6, 'Así lleva la herramienta exacta desde la primera visita y reduce viajes innecesarios.', '• Herramienta exacta: Lleva el repuesto o cable adecuado desde el primer viaje.');
zip.updateFile('ppt/slides/slide6.xml', Buffer.from(slide6, 'utf8'));

// SLIDE 7: Seguridad y Gestión de Usuarios (Palabras clave)
let slide7 = zip.readAsText('ppt/slides/slide7.xml', 'utf8');
slide7 = replaceExactText(slide7, 'Acceso validado con DNI de 8 dígitos. El sistema consulta la base de datos del instituto y confirma la identidad antes de habilitar el ingreso.', '• Ingreso oficial estricto con DNI de 8 dígitos validado en base de datos.');
slide7 = replaceExactText(slide7, 'Si el DNI pertenece a un usuario registrado, se concede acceso. Si no coincide, se deniega el acceso y se registra la notificación correspondiente.', '• Consulta instantánea a registros del instituto para impedir ingresos externos.');
slide7 = replaceExactText(slide7, 'Estudiantes y docentes que reportan fallas y consultan el estado de las averías.', '• Estudiantes y Docentes: Permiso para reportar averías en laboratorios.');
slide7 = replaceExactText(slide7, 'También vigilan sus reportes desde el tablero para dar seguimiento a cada incidencia.', '• Consulta de tarjetas en el tablero por columnas de turno.');
slide7 = replaceExactText(slide7, 'Soporte técnico que crea cuentas y registra DNI, nombre, turno y rol.', '• Soporte Técnico: Acceso al módulo de creación de cuentas por DNI y turno.');
slide7 = replaceExactText(slide7, 'Además, actualiza incidencias y las marca como solucionadas cuando el caso queda resuelto.', '• Facultad exclusiva de presionar el botón Marcar como Solucionado.');
zip.updateFile('ppt/slides/slide7.xml', Buffer.from(slide7, 'utf8'));

// SLIDE 8: Recuperación de Contraseña (CRÍTICO - CAMBIO LITERAL DE LA JEFA: SOLO DNI ADMIN)
let slide8 = zip.readAsText('ppt/slides/slide8.xml', 'utf8');
slide8 = replaceExactText(slide8, 'Flujo de Asistencia para Recuperación de Contraseña', 'Recuperación Directa de Clave');
slide8 = replaceExactText(slide8, 'Generar ticket', 'Módulo Exclusivo');
slide8 = replaceExactText(slide8, 'Solicitar ayuda', 'Solo DNI Admin');
slide8 = replaceExactText(slide8, 'Verificar y actualizar', 'Cambio Inmediato');
slide8 = replaceExactText(slide8, 'El usuario solicita ayuda y el sistema genera un ticket de soporte para dar seguimiento al caso. Luego, el Administrador Maestro verifica la identidad del usuario consultando la base de datos antes de autorizar cualquier cambio.', '• Módulo Exclusivo en Pantalla de Ingreso: La opción para recuperar la contraseña solo es visible y se activa al colocar el DNI del Administrador.');
slide8 = replaceExactText(slide8, 'Si la información coincide, la contraseña se actualiza de forma segura y el proceso completo queda registrado en el sistema para trazabilidad y auditoría.', '• Restablecimiento Directo: Al validar las credenciales, el administrador confirma su nombre y asigna una contraseña nueva al instante para mantener el control de su cuenta.');
zip.updateFile('ppt/slides/slide8.xml', Buffer.from(slide8, 'utf8'));

// SLIDE 9: Base de Datos y Limpieza Cron (Palabras clave)
let slide9 = zip.readAsText('ppt/slides/slide9.xml', 'utf8');
slide9 = replaceExactText(slide9, 'SOP Suiza almacena todas las incidencias y cuentas en PostgreSQL usando Prisma ORM, lo que garantiza una estructura sólida, escalable y fácil de mantener.', '• Motor relacional PostgreSQL gestionado con Prisma ORM de alta velocidad.');
slide9 = replaceExactText(slide9, ', cuenta con índices optimizados para búsquedas rápidas por usuario, fecha y estado, facilitando el seguimiento operativo y la consulta eficiente de registros.', '• Índices programados por usuario, por fecha y por estado para consultas en milisegundos.');
slide9 = replaceExactText(slide9, 'El servidor ejecuta una rutina automática de depuración para eliminar incidencias solucionadas con más de 24 horas de antigüedad.', '• Depuración automática: El sistema limpia tarjetas solucionadas con más de 24 horas.');
slide9 = replaceExactText(slide9, 'Con esto, solo permanece visible la información vigente, reduciendo ruido en el sistema y manteniendo la base de datos más limpia y ordenada.', '• Tablero ligero y sin ruido visual: Muestra únicamente alertas activas y arreglos del día.');
zip.updateFile('ppt/slides/slide9.xml', Buffer.from(slide9, 'utf8'));

// SLIDE 10: Resumen y Cierre (Palabras clave y Reconocimiento de la Jefa)
let slide10 = zip.readAsText('ppt/slides/slide10.xml', 'utf8');
slide10 = replaceExactText(slide10, 'Las fotografías múltiples permiten al técnico llevar el repuesto o herramienta exacta desde el primer viaje, reduciendo el tiempo total de atención.', '• Evidencias en tarjeta que permiten llevar la herramienta y repuesto exacto al primer viaje.');
slide10 = replaceExactText(slide10, 'Menos idas y vueltas, más precisión desde la primera visita.', '• Cero pérdida de tiempo en diagnósticos previos en aulas.');
slide10 = replaceExactText(slide10, 'Columnas de Turno Mañana y Turno Tarde con semáforo rojo para Pendiente y verde para Solucionado, junto con numeración clara de tickets.', '• Columnas independientes de Turno Mañana y Turno Tarde con semáforo y código único.');
slide10 = replaceExactText(slide10, 'Seguimiento visual inmediato para priorizar y cerrar casos sin confusión.', '• Organización visual y relevo técnico ordenado sin pérdida de información.');
slide10 = replaceExactText(slide10, 'Gestión de cuentas por DNI, roles definidos, recuperación asistida por ticket y autolimpieza diaria de 24 horas.', '• Ingreso por DNI, módulo exclusivo de clave para Admin y limpieza diaria de 24 horas.');
slide10 = replaceExactText(slide10, 'Administración segura, ordenada y siempre actualizada.', '• Liderazgo Tecnológico: LUZ LIZBETH JACOBO MARTEL — Directora General del Proyecto.');
zip.updateFile('ppt/slides/slide10.xml', Buffer.from(slide10, 'utf8'));

zip.writeZip(outputPptx);
console.log('¡Archivo modificado con éxito en:', outputPptx);
