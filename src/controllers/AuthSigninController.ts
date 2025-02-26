import { FastifyRequest, FastifyReply } from "fastify";
import { authenticateUser } from "../services/AuthSigninService";

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = req.body as { email: string; password: string };

  try {
    const user = await authenticateUser(email, password);
    reply.send({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    reply.status(400).send({ error });
  }
};
