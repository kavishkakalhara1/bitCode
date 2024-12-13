import nodemailer from 'nodemailer';

const sendEmail = async (req, res) => {
  const { to, subject, htmlContent } = req.body;

  // SMTP server configuration
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'refaaweb@gmail.com',
      pass: process.env.MAIL_PASS,
    },
  });

  // Email options
  const mailOptions = {
    from: '"REFAA" <refaaweb@gmail.com>',
    to: to,
    subject: subject,
    html: htmlContent,
  };

  // Sending email
  try {
    const info = await transporter.sendMail(mailOptions);
    res.send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send email');
  }
};

export { sendEmail };