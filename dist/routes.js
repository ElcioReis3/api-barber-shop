"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const CreateCustomerController_js_1 = require("./controllers/CreateCustomerController.js");
const ListCustomerController_js_1 = require("./controllers/ListCustomerController.js");
const DeleteCustomerController_js_1 = require("./controllers/DeleteCustomerController.js");
const UpdateCustomerController_js_1 = require("./controllers/UpdateCustomerController.js");
const paymentController_js_1 = require("./controllers/paymentController.js");
const PaymentValidController_js_1 = require("./controllers/PaymentValidController.js");
const UploadController_js_1 = require("./controllers/UploadController.js");
const multipart_1 = require("@fastify/multipart");
const AuthSigninController_js_1 = require("./controllers/AuthSigninController.js");
async function routes(fastify, options) {
    fastify.register(multipart_1.fastifyMultipart, {
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
        return new CreateCustomerController_js_1.CreateCustomerController().handle(request, reply);
    });
    fastify.get("/customers", async (request, reply) => {
        return new ListCustomerController_js_1.ListCustomerController().handle(request, reply);
    });
    fastify.get("/", async (request, reply) => {
        return { status: "API is running" };
    });
    fastify.delete("/customer", async (request, reply) => {
        return new DeleteCustomerController_js_1.DeleteCustomerController().handle(request, reply);
    });
    fastify.put("/customer", async (request, reply) => {
        return new UpdateCustomerController_js_1.UpdateCustomerController().handle(request, reply);
    });
    fastify.post("/plan/checkout", paymentController_js_1.checkout);
    fastify.post("/login", AuthSigninController_js_1.login);
    fastify.register(PaymentValidController_js_1.paymentValidController, { prefix: "/payments" });
    // Rota para upload de imagem
    fastify.put("/customer/:userId/upload", async (request, reply) => {
        return new UploadController_js_1.UploadController().handle(request, reply);
    });
}
