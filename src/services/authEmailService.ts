import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Redefinição de Senha",
    text: `Clique no link para redefinir sua senha: ${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`,
  };

  await transporter.sendMail(mailOptions);
};
