import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prisma";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "../services/authEmailService";

interface ForgotPasswordRequest extends FastifyRequest {
  body: {
    email: string;
  };
}

export const forgotPassword = async (
  request: ForgotPasswordRequest,
  reply: FastifyReply
): Promise<void> => {
  const { email } = request.body;
  try {
    const user = await prisma.customer.findUnique({ where: { email } });

    if (!user) {
      return reply.send({
        message: "E-mail de recuperação enviado com sucesso!",
      });
    }

    const resetToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    await prisma.customer.update({
      where: { email },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: new Date(Date.now() + 3600 * 1000),
      },
    });

    await sendPasswordResetEmail(email, resetToken);
    reply.send({ message: "E-mail de recuperação enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao processar a solicitação. " + error);
    reply.status(500).send({ message: "Erro ao processar a solicitação." });
  }
};
