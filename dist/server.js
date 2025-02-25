import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes.js";
import dotenv from "dotenv";
import fastifyStatic from "@fastify/static";
import path from "path";
dotenv.config();
const app = fastify({ logger: true });
app.register(fastifyStatic, {
    //root: path.join(__dirname, "../uploads"),
    root: path.join(path.dirname(import.meta.url), "../uploads"),
    prefix: "/uploads/",
});
const start = async () => {
    await app.register(cors);
    await app.register(routes);
    try {
        await app.listen({ port: 3001 });
        console.log("Servidor rodando em http://localhost:3001");
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
