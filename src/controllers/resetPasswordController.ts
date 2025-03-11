import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

// Instanciando o Prisma Client
export const prisma = new PrismaClient();

interface ResetPasswordRequest extends FastifyRequest {
  body: {
    token: string;
    password: string;
  };
}

export const resetPassword = async (
  request: ResetPasswordRequest,
  reply: FastifyReply
): Promise<void> => {
  const { token, password } = request.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    const user = await prisma.customer.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.resetPasswordToken !== token) {
      return reply.status(400).send({ message: "Token inválido ou expirado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.customer.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    reply.send({ message: "Senha redefinida com sucesso!" });
  } catch (error) {
    console.error("Erro ao redefinir a senha:", error);
    reply.status(500).send({ message: "Erro ao redefinir a senha." });
  }
};
