
/* Caso algum erro, script manda email relatando o problema
        ──────▄▀▄─────▄▀▄─────────────────────────────────
        ─────▄█░░▀▀▀▀▀░░█▄
        ─▄▄──█░░░░░░░░░░░█──▄▄  Victória Belo @ 2024
        █▄▄█─█░░▀░░┬░░▀░░█─█▄▄█ https://github.com/Victoria-Belo 
 */

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'x',
    pass: '**************'    
  }
});

async function sendEmail(subject, text) {
  const mailOptions = {
    from: 'x',
    to: 'y',
    subject: subject + " IMAGE EXCEL CONVERTER SCRIPT",
    text: text
  };  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Log enviado com sucesso', mailOptions.text);
  } catch (error) {
    console.error('Erro ao enviar log', error);
  }
}

module.exports = {sendEmail}
