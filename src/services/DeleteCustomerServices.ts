import prismaClient from "../prisma/index.js";

interface DeleteCustomerProps {
  id: string;
}

class DeleteCustomerServices {
  async execute({ id }: DeleteCustomerProps) {
    if (!id) {
      throw new Error("Solicitação inválida");
    }
    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id: id,
      },
    });
    if (!findCustomer) {
      throw new Error("Cliente não existe");
    }
    await prismaClient.customer.delete({
      where: {
        id: findCustomer.id,
      },
    });

    return { message: "Deletado com sucesso!" };
  }
}

export { DeleteCustomerServices };
