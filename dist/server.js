"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, fastify_1.default)({ logger: true });
// Configuração de arquivos estáticos (uploads de imagens, por exemplo)
app.register(static_1.default, {
    root: path_1.default.join(__dirname, "../uploads"),
    prefix: "/uploads/",
});
// Configuração de CORS
app.register(cors_1.default);
// Registro das rotas
app.register(routes_1.routes);
const start = async () => {
    try {
        await app.listen({ port: 3001, host: "127.0.0.1" });
        console.log(`🚀 Servidor rodando em http://127.0.0.1:3001`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
