import PptxGenJS from 'pptxgenjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generarPresentacion() {
  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Equipo Proyecto Puyo - IESTP Suiza';
  pptx.company = 'IESTP Suiza';
  pptx.title = 'SOP Suiza - Sistema Operativo y de Soporte';

  const COLOR_NAVY = '0F172A';
  const COLOR_RED = 'DC2626';
  const COLOR_BLUE = '1E3A8A';
  const COLOR_LIGHT = 'F8FAFC';
  const COLOR_CARD = 'FFFFFF';
  const COLOR_BORDER = 'E2E8F0';
  const COLOR_GRAY = '64748B';

  const addHeader = (slide, titulo, expositor) => {
    slide.background = { color: COLOR_LIGHT };
    
    slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.15, fill: { color: COLOR_RED } });
    
    slide.addText(titulo, {
      x: 0.6, y: 0.4, w: 8.8, h: 0.6,
      fontSize: 24, fontFace: 'Arial', bold: true, color: COLOR_NAVY
    });

    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: 1.05, w: 6.2, h: 0.35,
      fill: { color: COLOR_BLUE }, line: { color: COLOR_BLUE }, rectRadius: 0.05
    });
    slide.addText(`🎙️ Turno de Exposición: ${expositor}`, {
      x: 0.7, y: 1.05, w: 6.0, h: 0.35,
      fontSize: 12, fontFace: 'Arial', bold: true, color: 'FFFFFF', valign: 'middle'
    });

    slide.addText('SOP Suiza | Sistema Operativo y de Soporte — Palabras Clave para Sustentación', {
      x: 0.6, y: 5.25, w: 8.8, h: 0.3,
      fontSize: 10, fontFace: 'Arial', color: COLOR_GRAY, align: 'right'
    });
  };

  // =========================================================================
  // DIAPOSITIVA 1: PORTADA PRINCIPAL
  // =========================================================================
  const slide1 = pptx.addSlide();
  slide1.background = { color: COLOR_NAVY };
  
  slide1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.25, h: '100%', fill: { color: COLOR_RED } });

  slide1.addText('SOP SUIZA: SISTEMA OPERATIVO Y DE SOPORTE', {
    x: 0.8, y: 0.6, w: 8.5, h: 0.8,
    fontSize: 30, fontFace: 'Arial', bold: true, color: 'FFFFFF'
  });
  slide1.addText('Servicio Web en la Nube para Supervisión Operativa y Soporte Técnico en Tiempo Real', {
    x: 0.8, y: 1.4, w: 8.5, h: 0.5,
    fontSize: 16, fontFace: 'Arial', color: '94A3B8', italic: true
  });

  slide1.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 2.1, w: 8.5, h: 3.0,
    fill: { color: '1E293B' }, line: { color: COLOR_RED, width: 2 }, rectRadius: 0.1
  });

  slide1.addText('EQUIPO DE INGENIERÍA Y DIRECCIÓN DEL PROYECTO:', {
    x: 1.1, y: 2.3, w: 8.0, h: 0.4,
    fontSize: 14, fontFace: 'Arial', bold: true, color: COLOR_RED
  });

  slide1.addText([
    { text: '👑 JACOBO MARTEL, LUZ LIZBETH ', options: { bold: true, color: 'FFFFFF', fontSize: 13 } },
    { text: '— Directora General, Arquitecta Principal y Líder del Proyecto\n', options: { bold: true, color: 'FCA5A5', fontSize: 11 } },
    { text: '   Concepción de SOP Suiza, desarrollo web en Next.js, base de datos PostgreSQL y seguridad\n\n', options: { italic: true, color: 'CBD5E1', fontSize: 10 } },
    { text: '• Melgarejo Huaman, Anllely Sileny ', options: { bold: true, color: 'FFFFFF', fontSize: 12 } },
    { text: '— Equipo de Calidad y Pruebas\n', options: { color: '94A3B8', fontSize: 11 } },
    { text: '• Macedo Macedo, Cristiam Saul ', options: { bold: true, color: 'FFFFFF', fontSize: 12 } },
    { text: '— Estructuración Académica y Soporte\n', options: { color: '94A3B8', fontSize: 11 } },
    { text: '• Rodriguez Cari, Christian Jhoel ', options: { bold: true, color: 'FFFFFF', fontSize: 12 } },
    { text: '— Validación y Conectividad\n', options: { color: '94A3B8', fontSize: 11 } },
    { text: '• Salas Ormeño, Geric Aldair ', options: { bold: true, color: 'FFFFFF', fontSize: 12 } },
    { text: '— Rutas y Mantenimiento', options: { color: '94A3B8', fontSize: 11 } }
  ], { x: 1.1, y: 2.75, w: 8.0, h: 2.2 });


  // =========================================================================
  // DIAPOSITIVA 2: EL DESAFÍO OPERATIVO EN EL IESTP SUIZA
  // =========================================================================
  const slide2 = pptx.addSlide();
  addHeader(slide2, '1. El Desafío Operativo en el IESTP Suiza', 'Jacobo Martel, Luz Lizbeth - Directora del Proyecto');

  slide2.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.6, w: 4.3, h: 3.3, fill: { color: COLOR_CARD }, line: { color: COLOR_BORDER }, rectRadius: 0.1 });
  slide2.addText('⚠️ Realidad de las Averías', { x: 0.8, y: 1.8, w: 3.9, h: 0.4, fontSize: 16, fontFace: 'Arial', bold: true, color: COLOR_RED });
  slide2.addText([
    { text: '• Paradas en aulas prácticas: ', options: { bold: true, color: COLOR_NAVY } },
    { text: 'Clases interrumpidas por averías en computadoras y maquinaria.\n\n', options: { color: COLOR_GRAY } },
    { text: '• Reportes verbales perdidos: ', options: { bold: true, color: COLOR_NAVY } },
    { text: 'Avisos de palabra o en papel que no dejan constancia ni responsable.\n\n', options: { color: COLOR_GRAY } },
    { text: '• Desconexión de turnos: ', options: { bold: true, color: COLOR_NAVY } },
    { text: 'Falta de comunicación clara entre el Turno Mañana y Turno Tarde.', options: { color: COLOR_GRAY } }
  ], { x: 0.8, y: 2.3, w: 3.9, h: 2.4, fontSize: 13 });

  slide2.addShape(pptx.ShapeType.rect, { x: 5.1, y: 1.6, w: 4.3, h: 3.3, fill: { color: 'EFF6FF' }, line: { color: 'BFDBFE' }, rectRadius: 0.1 });
  slide2.addText('🎯 Solución con SOP Suiza', { x: 5.3, y: 1.8, w: 3.9, h: 0.4, fontSize: 16, fontFace: 'Arial', bold: true, color: COLOR_BLUE });
  slide2.addText([
    { text: 'Canal Digital en Red:\n\n', options: { bold: true, color: COLOR_NAVY, fontSize: 14 } },
    { text: '✔ Accesible en cualquier navegador\n\n✔ Eliminación del papeleo físico\n\n✔ Tarjetas ordenadas en vivo por turnos\n\n✔ Atención directa del soporte en aulas', options: { bold: true, color: '1D4ED8', fontSize: 13 } }
  ], { x: 5.3, y: 2.3, w: 3.9, h: 2.4 });


  // =========================================================================
  // DIAPOSITIVA 3: PROPUESTA Y FUNCIONES CENTRALES
  // =========================================================================
  const slide3 = pptx.addSlide();
  addHeader(slide3, '2. Propuesta y Funciones Centrales de SOP Suiza', 'Melgarejo Huaman, Anllely Sileny');

  slide3.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.6, w: 8.8, h: 1.1, fill: { color: COLOR_CARD }, line: { color: COLOR_BORDER }, rectRadius: 0.1 });
  slide3.addText('🌐 Tres Pilares de Operación en Red:', { x: 0.8, y: 1.75, w: 8.4, h: 0.3, fontSize: 16, bold: true, color: COLOR_NAVY });
  slide3.addText('Plataforma web en la nube que centraliza reportes, tarjetas de avería y control oficial de usuarios.', { x: 0.8, y: 2.1, w: 8.4, h: 0.5, fontSize: 14, color: COLOR_GRAY });

  const pilares = [
    { title: '⚡ Registro Inmediato', desc: 'Acceso veloz con DNI desde PC o móvil en pocos segundos.', color: 'FEF2F2', border: 'FECACA', text: COLOR_RED },
    { title: '🔍 Supervisión Visual', desc: 'Tarjetas dinámicas con título, descripción, autor y ambiente.', color: 'EFF6FF', border: 'BFDBFE', text: COLOR_BLUE },
    { title: '🤝 Control de Tiempos', desc: 'Botón de solución que sella la fecha y minuto de la reparación.', color: 'F0FDF4', border: 'BBF7D0', text: '15803D' }
  ];

  pilares.forEach((p, idx) => {
    const xPos = 0.6 + (idx * 3.0);
    slide3.addShape(pptx.ShapeType.rect, { x: xPos, y: 2.9, w: 2.8, h: 2.0, fill: { color: p.color }, line: { color: p.border }, rectRadius: 0.1 });
    slide3.addText(p.title, { x: xPos + 0.15, y: 3.1, w: 2.5, h: 0.3, fontSize: 14, bold: true, color: p.text });
    slide3.addText(p.desc, { x: xPos + 0.15, y: 3.5, w: 2.5, h: 1.2, fontSize: 12, color: COLOR_NAVY });
  });


  // =========================================================================
  // DIAPOSITIVA 4: TABLERO DINÁMICO POR TURNOS
  // =========================================================================
  const slide4 = pptx.addSlide();
  addHeader(slide4, '3. Tablero Dinámico de Supervisión por Turnos', 'Melgarejo Huaman, Anllely Sileny');

  slide4.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.6, w: 4.3, h: 3.3, fill: { color: COLOR_CARD }, line: { color: COLOR_BORDER }, rectRadius: 0.1 });
  slide4.addText('☀️ vs 🌙 Columnas de Turno', { x: 0.8, y: 1.8, w: 3.9, h: 0.4, fontSize: 16, bold: true, color: COLOR_NAVY });
  slide4.addText([
    { text: '• Pantalla dividida en dos:\n', options: { bold: true, color: COLOR_NAVY } },
    { text: 'Columnas independientes para Turno Mañana y Turno Tarde.\n\n', options: { color: COLOR_GRAY } },
    { text: '• Clasificación automática:\n', options: { bold: true, color: COLOR_NAVY } },
    { text: 'Las tarjetas se ordenan según el turno del usuario reportante.\n\n', options: { color: COLOR_GRAY } },
    { text: '• Relevo ordenado:\n', options: { bold: true, color: COLOR_NAVY } },
    { text: 'El técnico entrante visualiza de inmediato sus pendientes sin confusión.', options: { color: COLOR_GRAY } }
  ], { x: 0.8, y: 2.3, w: 3.9, h: 2.4, fontSize: 13 });

  slide4.addShape(pptx.ShapeType.rect, { x: 5.1, y: 1.6, w: 4.3, h: 3.3, fill: { color: COLOR_CARD }, line: { color: COLOR_BORDER }, rectRadius: 0.1 });
  slide4.addText('🚦 Semáforo y Código Único', { x: 5.3, y: 1.8, w: 3.9, h: 0.4, fontSize: 16, bold: true, color: COLOR_NAVY });
  slide4.addText([
    { text: 'Distintivos visuales rápidos:\n\n', options: { bold: true, color: COLOR_NAVY } },
    { text: '🔴 ALERTA ROJA (Pendiente):\n', options: { bold: true, color: COLOR_RED, fontSize: 13 } },
    { text: 'Falla activa que requiere intervención técnica en el taller.\n\n', options: { color: COLOR_GRAY } },
    { text: '🟢 ALERTA VERDE (Solucionado):\n', options: { bold: true, color: '15803D', fontSize: 13 } },
    { text: 'Tarjeta resuelta con sello exacto de fecha y minuto de arreglo.\n\n', options: { color: COLOR_GRAY } },
    { text: '✔ Código de 4 dígitos: ', options: { bold: true, color: COLOR_NAVY } },
    { text: 'Numeración oficial para seguimiento.', options: { color: COLOR_GRAY } }
  ], { x: 5.3, y: 2.3, w: 3.9, h: 2.4, fontSize: 12 });


  // =========================================================================
  // DIAPOSITIVA 5: REGISTRO ÁGIL Y COBERTURA
  // =========================================================================
  const slide5 = pptx.addSlide();
  addHeader(slide5, '4. Registro Ágil y Cobertura de Ambientes', 'Macedo Macedo, Cristiam Saul');

  slide5.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.6, w: 4.3, h: 3.3, fill: { color: COLOR_CARD }, line: { color: COLOR_BORDER }, rectRadius: 0.1 });
  slide5.addText('📋 Formulario en 2 Clics', { x: 0.8, y: 1.8, w: 3.9, h: 0.4, fontSize: 16, bold: true, color: COLOR_NAVY });
  slide5.addText([
    { text: '• Cero campos innecesarios:\n', options: { bold: true, color: COLOR_NAVY } },
    { text: 'Solo se ingresa título breve del problema y descripción detallada del síntoma.\n\n', options: { color: COLOR_GRAY } },
    { text: '• Identidad automática:\n', options: { bold: true, color: COLOR_NAVY } },
    { text: 'El sistema toma automáticamente DNI, nombres y turno del usuario conectado sin digitación.', options: { color: COLOR_GRAY } }
  ], { x: 0.8, y: 2.3, w: 3.9, h: 2.4, fontSize: 13 });

  slide5.addShape(pptx.ShapeType.rect, { x: 5.1, y: 1.6, w: 4.3, h: 3.3, fill: { color: 'FEF2F2' }, line: { color: 'FECACA' }, rectRadius: 0.1 });
  slide5.addText('📍 Cobertura Oficial del Instituto', { x: 5.3, y: 1.8, w: 3.9, h: 0.4, fontSize: 16, bold: true, color: COLOR_RED });
  slide5.addText([
    { text: 'Selector con ambientes oficiales:\n\n', options: { bold: true, color: COLOR_NAVY, fontSize: 13 } },
    { text: '💻 Laboratorio de Cómputo 1, 2 y 3\n', options: { bold: true, color: COLOR_NAVY, fontSize: 13 } },
    { text: '⚡ Taller de Electrónica\n', options: { bold: true, color: COLOR_NAVY, fontSize: 13 } },
    { text: '🔧 Taller de Mecánica\n', options: { bold: true, color: COLOR_NAVY, fontSize: 13 } },
    { text: '🏫 Aula 101 y Biblioteca\n\n', options: { bold: true, color: COLOR_NAVY, fontSize: 13 } },
    { text: '→ Ubicación exacta y sin pérdidas de tiempo.', options: { italic: true, bold: true, color: '991B1B', fontSize: 12 } }
  ], { x: 5.3, y: 2.3, w: 3.9, h: 2.4 });


  // =========================================================================
  // DIAPOSITIVA 6: EVIDENCIA FOTOGRÁFICA MÚLTIPLE
  // =========================================================================
  const slide6 = pptx.addSlide();
  addHeader(slide6, '5. Evidencia Fotográfica Múltiple y Diagnóstico', 'Macedo Macedo, Cristiam Saul');

  slide6.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.6, w: 8.8, h: 3.3, fill: { color: COLOR_CARD }, line: { color: COLOR_BORDER }, rectRadius: 0.1 });
  slide6.addText('📸 Multimedia Integrada para Diagnóstico Previo', { x: 0.8, y: 1.8, w: 8.4, h: 0.4, fontSize: 18, bold: true, color: COLOR_NAVY });

  slide6.addText([
    { text: '• Subida de Múltiples Fotografías:\n', options: { bold: true, color: COLOR_NAVY, fontSize: 14 } },
    { text: 'Adjunto simultáneo de imágenes para mostrar mensajes de error, cables cortados o piezas averiadas.\n\n', options: { color: COLOR_GRAY, fontSize: 13 } },
    { text: '• Cuadrícula Visual con Control Individual:\n', options: { bold: true, color: COLOR_NAVY, fontSize: 14 } },
    { text: 'Previsualización en pantalla con botón de eliminación por imagen antes de confirmar el reporte.\n\n', options: { color: COLOR_GRAY, fontSize: 13 } },
    { text: '🚀 AHORRO DE TIEMPO Y HERRAMIENTA EXACTA:\n', options: { bold: true, color: COLOR_RED, fontSize: 14 } },
    { text: 'El técnico inspecciona las fotos desde el tablero, diagnostica de antemano y lleva el repuesto o herramienta adecuada desde el primer viaje.', options: { bold: true, color: COLOR_NAVY, fontSize: 13 } }
  ], { x: 0.8, y: 2.3, w: 8.4, h: 2.4 });


  // =========================================================================
  // DIAPOSITIVA 7: SEGURIDAD Y GESTIÓN DE USUARIOS
  // =========================================================================
  const slide7 = pptx.addSlide();
  addHeader(slide7, '6. Seguridad del Sistema y Roles de Usuario', 'Rodriguez Cari, Christian Jhoel');

  slide7.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.6, w: 4.3, h: 3.3, fill: { color: COLOR_CARD }, line: { color: COLOR_BORDER }, rectRadius: 0.1 });
  slide7.addText('🔐 Validación Estricta con DNI', { x: 0.8, y: 1.8, w: 3.9, h: 0.4, fontSize: 16, bold: true, color: COLOR_NAVY });
  slide7.addText([
    { text: '• Ingreso oficial al portal:\n', options: { bold: true, color: COLOR_NAVY } },
    { text: 'El sistema solicita el número exacto de Documento Nacional de Identidad de ocho dígitos.\n\n', options: { color: COLOR_GRAY } },
    { text: '• Verificación instantánea:\n', options: { bold: true, color: COLOR_NAVY } },
    { text: 'Consulta directa a la base de datos de miembros registrados, impidiendo ingresos externos.', options: { color: COLOR_GRAY } }
  ], { x: 0.8, y: 2.3, w: 3.9, h: 2.4, fontSize: 13 });

  slide7.addShape(pptx.ShapeType.rect, { x: 5.1, y: 1.6, w: 4.3, h: 3.3, fill: { color: 'EFF6FF' }, line: { color: 'BFDBFE' }, rectRadius: 0.1 });
  slide7.addText('🛡️ Dos Privilegios del Código', { x: 5.3, y: 1.8, w: 3.9, h: 0.4, fontSize: 16, bold: true, color: COLOR_BLUE });
  slide7.addText([
    { text: '👤 ROL USUARIO (Estudiantes y Docentes):\n', options: { bold: true, color: COLOR_NAVY, fontSize: 13 } },
    { text: 'Permiso para reportar fallas y consultar tarjetas en el tablero.\n\n', options: { color: COLOR_GRAY, fontSize: 12 } },
    { text: '🛡️ ROL ADMINISTRADOR (Soporte Técnico):\n', options: { bold: true, color: COLOR_BLUE, fontSize: 13 } },
    { text: 'Acceso a Gestión de Cuentas por DNI y facultad exclusiva para marcar tarjetas como solucionadas.', options: { color: COLOR_GRAY, fontSize: 12 } }
  ], { x: 5.3, y: 2.3, w: 3.9, h: 2.4 });


  // =========================================================================
  // DIAPOSITIVA 8: RECUPERACIÓN DE CONTRASEÑA
  // =========================================================================
  const slide8 = pptx.addSlide();
  addHeader(slide8, '7. Flujo Directo de Recuperación de Contraseña', 'Rodriguez Cari, Christian Jhoel');

  slide8.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.6, w: 8.8, h: 3.3, fill: { color: COLOR_CARD }, line: { color: COLOR_BORDER }, rectRadius: 0.1 });
  slide8.addText('🔑 Módulo Directo Exclusivo para el DNI del Administrador', { x: 0.8, y: 1.8, w: 8.4, h: 0.4, fontSize: 18, bold: true, color: COLOR_RED });

  slide8.addText([
    { text: '• Activación Exclusiva por DNI de Administrador:\n', options: { bold: true, color: COLOR_NAVY, fontSize: 14 } },
    { text: 'La opción y pantalla para recuperar la clave solo es visible cuando se coloca el Documento Nacional de Identidad del Administrador en la pantalla de ingreso.\n\n', options: { color: COLOR_GRAY, fontSize: 13 } },
    { text: '• Restablecimiento Directo:\n', options: { bold: true, color: COLOR_NAVY, fontSize: 14 } },
    { text: 'Al colocar el DNI y validar la identidad del administrador, el sistema abre directamente la interfaz de recuperación de acceso.\n\n', options: { color: COLOR_GRAY, fontSize: 13 } },
    { text: '🔒 PROCESO RÁPIDO Y AUTÓNOMO:\n', options: { bold: true, color: COLOR_BLUE, fontSize: 14 } },
    { text: 'El administrador ingresa la confirmación de su nombre e introduce una contraseña nueva al instante para restablecer el control de su cuenta principal.', options: { bold: true, color: COLOR_NAVY, fontSize: 13 } }
  ], { x: 0.8, y: 2.3, w: 8.4, h: 2.4 });


  // =========================================================================
  // DIAPOSITIVA 9: BASE DE DATOS Y LIMPIEZA CRON
  // =========================================================================
  const slide9 = pptx.addSlide();
  addHeader(slide9, '8. Base de Datos Optimizada y Limpieza Cron', 'Salas Ormeño, Geric Aldair');

  slide9.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.6, w: 4.3, h: 3.3, fill: { color: COLOR_CARD }, line: { color: COLOR_BORDER }, rectRadius: 0.1 });
  slide9.addText('⚙️ PostgreSQL + Prisma ORM', { x: 0.8, y: 1.8, w: 3.9, h: 0.4, fontSize: 16, bold: true, color: COLOR_NAVY });
  slide9.addText([
    { text: '• Arquitectura Relacional Robusta:\n', options: { bold: true, color: COLOR_NAVY } },
    { text: 'SOP Suiza almacena incidencias y cuentas en PostgreSQL con Prisma ORM.\n\n', options: { color: COLOR_GRAY } },
    { text: '• Índices en Milisegundos:\n', options: { bold: true, color: COLOR_NAVY } },
    { text: 'Índices programados por usuario, por fecha y por estado combinado para una carga rápida sin bloqueos.', options: { color: COLOR_GRAY } }
  ], { x: 0.8, y: 2.3, w: 3.9, h: 2.4, fontSize: 13 });

  slide9.addShape(pptx.ShapeType.rect, { x: 5.1, y: 1.6, w: 4.3, h: 3.3, fill: { color: 'F0FDF4' }, line: { color: 'BBF7D0' }, rectRadius: 0.1 });
  slide9.addText('🧹 Rutina Cron de Limpieza 24h', { x: 5.3, y: 1.8, w: 3.9, h: 0.4, fontSize: 16, bold: true, color: '15803D' });
  slide9.addText([
    { text: 'Autodepuración de Tarjetas Solucionadas:\n\n', options: { bold: true, color: COLOR_NAVY, fontSize: 13 } },
    { text: 'Al cargar la pantalla, el sistema verifica y depura automáticamente las tarjetas marcadas como Solucionado cuya fecha supere las veinticuatro horas.\n\n', options: { color: COLOR_GRAY } },
    { text: '🌟 TABLERO SIEMPRE LIMPIO:\n', options: { bold: true, color: '166534', fontSize: 12 } },
    { text: 'Muestra únicamente las urgencias activas y los arreglos del día.', options: { bold: true, color: COLOR_NAVY } }
  ], { x: 5.3, y: 2.3, w: 3.9, h: 2.4, fontSize: 12 });


  // =========================================================================
  // DIAPOSITIVA 10: RESUMEN DE BENEFICIOS REALES Y CIERRE
  // =========================================================================
  const slide10 = pptx.addSlide();
  slide10.background = { color: COLOR_NAVY };

  slide10.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.25, h: '100%', fill: { color: COLOR_RED } });

  slide10.addText('SOP SUIZA: RESUMEN Y CIERRE', {
    x: 0.8, y: 0.4, w: 8.5, h: 0.5,
    fontSize: 24, fontFace: 'Arial', bold: true, color: COLOR_RED
  });
  slide10.addText('🎙️ Turno de Exposición: Salas Ormeño, Geric Aldair | Cierre y Conclusión', {
    x: 0.8, y: 0.9, w: 8.5, h: 0.3,
    fontSize: 13, fontFace: 'Arial', bold: true, color: '94A3B8'
  });

  slide10.addShape(pptx.ShapeType.rect, { x: 0.8, y: 1.4, w: 8.5, h: 2.3, fill: { color: '1E293B' }, line: { color: '334155' }, rectRadius: 0.1 });
  slide10.addText([
    { text: '✔ Diagnóstico Certero al Primer Viaje: ', options: { bold: true, color: '60A5FA', fontSize: 14 } },
    { text: 'Evidencias fotográficas en tarjeta para llevar la herramienta exacta.\n\n', options: { color: 'FFFFFF', fontSize: 13 } },
    { text: '✔ Orden Total por Jornada Académica: ', options: { bold: true, color: '60A5FA', fontSize: 14 } },
    { text: 'Columnas independientes de Turno Mañana y Turno Tarde con semáforo y código único.\n\n', options: { color: 'FFFFFF', fontSize: 13 } },
    { text: '✔ Plataforma Web con Roles y Limpieza Cron: ', options: { bold: true, color: '60A5FA', fontSize: 14 } },
    { text: 'Ingreso por DNI, módulo directo de clave para Admin y limpieza diaria de tarjetas de 24h.', options: { color: 'FFFFFF', fontSize: 13 } }
  ], { x: 1.0, y: 1.55, w: 8.1, h: 2.0 });

  slide10.addShape(pptx.ShapeType.rect, { x: 0.8, y: 3.9, w: 8.5, h: 1.3, fill: { color: '7F1D1D' }, line: { color: COLOR_RED, width: 2 }, rectRadius: 0.1 });
  slide10.addText([
    { text: '👑 RECONOCIMIENTO A DIRECCIÓN Y ARQUITECTURA CORE:\n', options: { bold: true, color: 'FCA5A5', fontSize: 11 } },
    { text: 'SOP Suiza concebido, diseñado, programado y dirigido en su arquitectura por LUZ LIZBETH JACOBO MARTEL como Directora General del Proyecto, con el apoyo del equipo de ingeniería.\n\n', options: { bold: true, color: 'FFFFFF', fontSize: 12 } },
    { text: '💡 SOP Suiza: un servicio web moderno para que los talleres nunca dejen de funcionar.', options: { bold: true, italic: true, color: 'FEF08A', fontSize: 13 } }
  ], { x: 1.0, y: 4.0, w: 8.1, h: 1.1, align: 'center' });

  const outputFilePath = path.join(__dirname, '..', 'Presentacion_IESTP_Suiza_Natural.pptx');
  await pptx.writeFile({ fileName: outputFilePath });
  console.log('¡Presentación generada exitosamente en:', outputFilePath);
}

generarPresentacion().catch(err => {
  console.error('Error al generar la presentación:', err);
  process.exit(1);
});
