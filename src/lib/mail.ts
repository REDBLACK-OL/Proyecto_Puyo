import nodemailer from 'nodemailer';

interface AlertaIncidenciaParams {
  titulo: string;
  descripcion: string;
  aula: string;
  usuarioNombre: string;
  usuarioDni: string;
}

export async function enviarCorreoNuevaIncidencia({
  titulo,
  descripcion,
  aula,
  usuarioNombre,
  usuarioDni
}: AlertaIncidenciaParams) {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_ADMIN } = process.env;

  // Si no se han configurado las credenciales, omitimos de manera segura sin bloquear el reporte
  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_ADMIN) {
    console.log("⚠️ [Nodemailer] Variables EMAIL_USER, EMAIL_PASS o EMAIL_ADMIN no definidas en .env. Correo no enviado.");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    const fechaActual = new Date().toLocaleString('es-PE', {
      timeZone: 'America/Lima',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
          .header { background-color: #1e3a8a; color: #ffffff; padding: 24px; text-align: center; border-bottom: 4px solid #dc2626; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 4px 0 0 0; font-size: 12px; color: #bfdbfe; text-transform: uppercase; font-weight: 600; }
          .content { padding: 28px; color: #1e293b; }
          .alert-badge { display: inline-block; background-color: #fef2f2; color: #dc2626; border: 1px solid #fecaca; font-weight: 700; font-size: 13px; padding: 6px 14px; border-radius: 50px; margin-bottom: 20px; }
          .field-group { margin-bottom: 18px; background-color: #f8fafc; padding: 14px 18px; border-radius: 8px; border-left: 4px solid #3b82f6; }
          .field-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 4px; }
          .field-value { font-size: 15px; font-weight: 600; color: #0f172a; margin: 0; }
          .description-box { background-color: #ffffff; border: 1px solid #cbd5e1; padding: 14px; border-radius: 8px; margin-top: 6px; font-size: 14px; color: #334155; line-height: 1.5; }
          .footer { background-color: #f1f5f9; padding: 18px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>IESTP SUIZA - SOPORTE TÉCNICO</h1>
            <p>Sistema Operativo y de Soporte (SOP Suiza)</p>
          </div>
          <div class="content">
            <div class="alert-badge">🚨 ALERTA: NUEVA INCIDENCIA REGISTRADA</div>
            
            <div class="field-group" style="border-left-color: #dc2626;">
              <div class="field-label">Ambiente / Laboratorio</div>
              <div class="field-value" style="font-size: 18px; color: #dc2626;">${aula}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Título del Problema</div>
              <div class="field-value">${titulo}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Reportado Por</div>
              <div class="field-value">${usuarioNombre} (DNI: ${usuarioDni})</div>
            </div>

            <div class="field-group">
              <div class="field-label">Fecha y Hora del Reporte</div>
              <div class="field-value">${fechaActual}</div>
            </div>

            <div style="margin-top: 20px;">
              <div class="field-label" style="margin-bottom: 6px;">Descripción Detallada</div>
              <div class="description-box">${descripcion}</div>
            </div>
          </div>
          <div class="footer">
            Este es un correo automático generado por el Portal de Incidencias IESTP Suiza.<br>
            Por favor ingrese al portal web para gestionar y marcar el estado de la incidencia.
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Portal Incidencias IESTP Suiza" <${EMAIL_USER}>`,
      to: EMAIL_ADMIN,
      subject: `🚨 [SOP Suiza] Nueva Incidencia en ${aula}: ${titulo}`,
      html: htmlContent
    });

    console.log(`✅ [Nodemailer] Alerta enviada con éxito al administrador: ${EMAIL_ADMIN}`);
    return true;
  } catch (error) {
    console.error("❌ [Nodemailer] Error al enviar correo de notificación:", error);
    return false;
  }
}
