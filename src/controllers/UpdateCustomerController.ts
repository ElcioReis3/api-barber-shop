import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateCustomerServices } from "../services/UpdateCustomerServices";

class UpdateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string };
    const { name, email, address, phone, password, status, dueDate, plan } =
      request.body as {
        name?: string;
        email?: string;
        address?: string;
        phone?: string;
        plan?: string;
        password?: string;
        status?: boolean;
        dueDate?: string;
      };

    const customerService = new UpdateCustomerServices();

    try {
      const updatedCustomer = await customerService.execute({
        id,
        name,
        email,
        address,
        phone,
        plan,
        password,
        status,
        dueDate,
      });

      return reply.status(200).send(updatedCustomer);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }
}

export { UpdateCustomerController };
