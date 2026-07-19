const path = require('path');
require('@next/env').loadEnvConfig(path.resolve(__dirname, '..'));
const nodemailer = require('nodemailer');

async function testMail() {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_ADMIN } = process.env;
  console.log(`📧 Intentando enviar correo de prueba desde ${EMAIL_USER} hacia ${EMAIL_ADMIN}...`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"Portal Incidencias IESTP Suiza" <${EMAIL_USER}>`,
      to: EMAIL_ADMIN,
      subject: `🚨 [PRUEBA EXITOSA] Sistema SOP Suiza - Alerta de Incidencia`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #1e3a8a; border-radius: 10px; max-width: 500px;">
          <h2 style="color: #1e3a8a; margin-top:0;">🚀 ¡Correo Automático Conectado con Éxito!</h2>
          <p style="color: #333; font-size: 15px;">
            Este es un mensaje de verificación para confirmar que la cuenta <b>${EMAIL_USER}</b> está enviando notificaciones en tiempo real para el portal del <b>IESTP Suiza</b>.
          </p>
          <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 12px; margin: 15px 0;">
            <b>Ambiente:</b> Taller de Electrónica<br>
            <b>Reportado por:</b> Administrador de Prueba (DNI: 76866377)
          </div>
          <p style="font-size: 12px; color: #666; margin-bottom: 0;">Sistema Operativo y de Soporte (SOP Suiza)</p>
        </div>
      `
    });
    console.log("✅ ¡CORREO ENVIADO CON ÉXITO! Revisa tu bandeja de entrada en " + EMAIL_ADMIN);
  } catch (err) {
    console.error("❌ Error al enviar correo de prueba:", err.message);
  }
}

testMail();
