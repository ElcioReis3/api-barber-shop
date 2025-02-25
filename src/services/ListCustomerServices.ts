import prismaClient from "../prisma/index.js";

class ListCustomerServices {
  async execute() {
    const customersList = await prismaClient.customer.findMany();

    return customersList;
  }
}

export { ListCustomerServices };
