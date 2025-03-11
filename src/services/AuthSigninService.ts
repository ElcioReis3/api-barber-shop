import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const prisma = new PrismaClient();

export const authenticateUser = async (email: string, password: string) => {
  const user = await prisma.customer.findUnique({ where: { email } });
  if (!user) throw new Error("Usuário não encontrado");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Senha incorreta");
  return user;
};
