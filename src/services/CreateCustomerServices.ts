import { error } from "console";
import prismaClient from "../prisma";

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

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        address,
        phone,
        password,
        status: false,
      },
    });

    return customer;
  }
}

export { CreateCustomerServices };
