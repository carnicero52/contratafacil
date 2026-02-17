import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { config, emailDestino, data } = body;

    if (!config.smtp || !config.usuario || !config.password) {
      return NextResponse.json({ 
        success: false, 
        error: 'Configuración de email incompleta' 
      }, { status: 400 });
    }

    // Crear transporter
    const transporter = nodemailer.createTransport({
      host: config.smtp,
      port: config.puerto || 587,
      secure: config.puerto === 465,
      auth: {
        user: config.usuario,
        pass: config.password
      }
    });

    // Preparar email
    const mailOptions = {
      from: `"${config.remitente || data.nombreNegocio}" <${config.usuario}>`,
      to: emailDestino,
      subject: `🔔 Nuevo candidato: ${data.nombreCandidato}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #0d9488); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🔔 Nuevo Candidato</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="margin: 0 0 20px; color: #6b7280;">
              Has recibido una nueva aplicación para tu vacante en <strong>${data.nombreNegocio}</strong>
            </p>
            
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px; color: #111827; font-size: 18px;">👤 ${data.nombreCandidato}</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; width: 120px;">📧 Email:</td>
                  <td style="padding: 8px 0; color: #111827;">${data.emailCandidato}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">📱 Teléfono:</td>
                  <td style="padding: 8px 0; color: #111827;">${data.telefonoCandidato}</td>
                </tr>
                ${data.puestoSolicitado ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">💼 Puesto:</td>
                  <td style="padding: 8px 0; color: #111827;">${data.puestoSolicitado}</td>
                </tr>
                ` : ''}
                ${data.experiencia ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">⏱️ Experiencia:</td>
                  <td style="padding: 8px 0; color: #111827;">${data.experiencia}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin" 
                 style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                Ver en Panel →
              </a>
            </div>
            
            <p style="margin: 20px 0 0; color: #9ca3af; font-size: 12px; text-align: center;">
              📅 ${new Date().toLocaleDateString('es-MX', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      `
    };

    // Enviar
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error enviando email:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Error al enviar el email' 
    }, { status: 500 });
  }
}
