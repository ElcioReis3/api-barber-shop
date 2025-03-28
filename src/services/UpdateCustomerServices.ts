import prismaClient from "../prisma";

interface UpdateCustomerProps {
  id: string;
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  plan?: string;
  password?: string;
  status?: boolean;
  dueDate?: string;
  subscriptionDate?: string;
}

class UpdateCustomerServices {
  async execute({
    id,
    name,
    email,
    address,
    phone,
    plan,
    password,
    status,
    dueDate,
    subscriptionDate,
  }: UpdateCustomerProps) {
    if (!id) {
      throw new Error("ID do cliente é obrigatório");
    }
    const customerExists = await prismaClient.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customerExists) {
      throw new Error("Cliente não encontrado");
    }

    // Atualiza somente os campos enviados
    const updatedCustomer = await prismaClient.customer.update({
      where: { id },
      data: {
        name: name || customerExists.name,
        email: email || customerExists.email,
        address: address || customerExists.address,
        phone: phone || customerExists.phone,
        plan: plan || customerExists.plan,
        password: password || customerExists.password,
        status: status !== undefined ? status : customerExists.status,
        dueDate: dueDate || customerExists.dueDate,
        subscriptionDate: subscriptionDate || customerExists.subscriptionDate,
      },
    });

    return updatedCustomer;
  }
}

export { UpdateCustomerServices };
