import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomerServices } from "../services/ListCustomerServices.js";

class ListCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listCustomerServices = new ListCustomerServices();

    const customers = await listCustomerServices.execute();

    reply.send(customers);
  }
}

export { ListCustomerController };
