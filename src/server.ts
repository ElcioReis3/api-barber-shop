import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";
import dotenv from "dotenv";
import fastifyStatic from "@fastify/static";
import path from "path";

dotenv.config();

const app = fastify({ logger: true });

// Configuração de arquivos estáticos (uploads de imagens, por exemplo)
app.register(fastifyStatic, {
  root: path.join(__dirname, "../uploads"),
  prefix: "/uploads/",
});

// Configuração de CORS

// Registro das rotas
const start = async () => {
  await app.register(routes);
  await app.register(cors);
  const PORT = process.env.PORT || 3001;
  try {
    await app.listen({ port: Number(PORT), host: "127.0.0.1" });
    console.log(`🚀 Servidor rodando em http://127.0.0.1:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
