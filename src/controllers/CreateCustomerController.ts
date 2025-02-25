import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerServices } from "../services/CreateCustomerServices.js";

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, address, phone, password } = request.body as {
      name: string;
      email: string;
      address: string;
      phone: string;
      password: string;
    };

    const customerService = new CreateCustomerServices();

    const customer = await customerService.execute({
      name,
      email,
      address,
      phone,
      password,
    });

    reply.send(customer);
  }
}

export { CreateCustomerController };
