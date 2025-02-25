import prismaClient from "../prisma";

class ListCustomerServices {
  async execute() {
    const customersList = await prismaClient.customer.findMany();

    return customersList;
  }
}

export { ListCustomerServices };
