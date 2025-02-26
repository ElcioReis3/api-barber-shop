import prismaClient from "../prisma";
import bcrypt from "bcrypt";

interface CreateCustomerProps {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
}

class CreateCustomerServices {
  async execute({
    name,
    email,
    address,
    phone,
    password,
  }: CreateCustomerProps) {
    if (!name || !email) {
      throw new Error("Preencha todos os campos");
    }
    const emailExists = await prismaClient.customer.findUnique({
      where: {
        email,
        phone,
      },
    });
    if (emailExists) {
      throw new Error("Email já cadastrado");
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10); // 10 é o número de "salts" para o bcrypt

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        address,
        phone,
        password: hashedPassword,
        status: false,
      },
    });

    return customer;
  }
}

export { CreateCustomerServices };
