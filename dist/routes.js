import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomerController } from "./controllers/ListCustomerController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { UpdateCustomerController } from "./controllers/UpdateCustomerController";
import { checkout } from "./controllers/paymentController";
import { paymentValidController } from "./controllers/PaymentValidController";
import { UploadController } from "./controllers/UploadController";
import { fastifyMultipart } from "@fastify/multipart";
export async function routes(fastify, options) {
    fastify.register(fastifyMultipart, {
        limits: {
            fileSize: 100 * 1024 * 1024, // 100MB
        },
    });
    fastify.get("/listClients", async (request, reply) => {
        return {
            ok: true,
        };
    });
    fastify.post("/customer", async (request, reply) => {
        return new CreateCustomerController().handle(request, reply);
    });
    fastify.get("/customers", async (request, reply) => {
        return new ListCustomerController().handle(request, reply);
    });
    fastify.delete("/customer", async (request, reply) => {
        return new DeleteCustomerController().handle(request, reply);
    });
    fastify.put("/customer", async (request, reply) => {
        return new UpdateCustomerController().handle(request, reply);
    });
    fastify.post("/plan/checkout", checkout);
    fastify.register(paymentValidController, { prefix: "/payments" });
    // Rota para upload de imagem
    fastify.put("/customer/:userId/upload", async (request, reply) => {
        return new UploadController().handle(request, reply);
    });
}
