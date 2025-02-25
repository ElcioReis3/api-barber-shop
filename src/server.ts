import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes.js";
import dotenv from "dotenv";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify({ logger: true });

// Configuração de arquivos estáticos (uploads de imagens, por exemplo)
app.register(fastifyStatic, {
  root: path.join(__dirname, "../uploads"),
  prefix: "/uploads/",
});

// Configuração de CORS
app.register(cors);

// Registro das rotas
app.register(routes);

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await app.listen({ port: Number(PORT), host: "0.0.0.0" });
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
