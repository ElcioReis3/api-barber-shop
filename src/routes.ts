import Fastify, {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController.js";
import { ListCustomerController } from "./controllers/ListCustomerController.js";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController.js";
import { UpdateCustomerController } from "./controllers/UpdateCustomerController.js";
import { checkout } from "./controllers/paymentController.js";
import { paymentValidController } from "./controllers/PaymentValidController.js";

import { UploadController } from "./controllers/UploadController.js";
import { fastifyMultipart } from "@fastify/multipart";
import { login } from "./controllers/AuthSigninController.js";
import { forgotPassword } from "./controllers/authEmailController.js";
import { resetPassword } from "./controllers/resetPasswordController.js";

interface Params {
  userId: string;
}

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.register(fastifyMultipart, {
    limits: {
      fileSize: 100 * 1024 * 1024, // 100MB
    },
  });

  fastify.get(
    "/listClients",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return {
        ok: true,
      };
    }
  );
  fastify.post(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateCustomerController().handle(request, reply);
    }
  );
  fastify.get(
    "/customers",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomerController().handle(request, reply);
    }
  );
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return { status: "API is running" };
  });
  fastify.delete(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteCustomerController().handle(request, reply);
    }
  );
  fastify.put(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateCustomerController().handle(request, reply);
    }
  );
  fastify.post("/plan/checkout", checkout);
  fastify.post("/login", login);
  fastify.register(paymentValidController, { prefix: "/payments" });
  // Rota para upload de imagem
  fastify.put<{ Params: Params }>(
    "/customer/:userId/upload",
    async (request, reply) => {
      return new UploadController().handle(request, reply);
    }
  );
  fastify.post<{ Body: { email: string } }>("/forgotpassword", forgotPassword);
  fastify.post<{ Body: { token: string; password: string } }>(
    "/reset-password",
    resetPassword
  );
}
