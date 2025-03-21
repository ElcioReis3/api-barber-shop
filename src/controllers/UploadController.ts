import { FastifyReply, FastifyRequest } from "fastify";
import UploadService from "../services/UploadService";

interface Params {
  userId: string;
}

class UploadController {
  async handle(
    request: FastifyRequest<{ Params: Params }>,
    reply: FastifyReply
  ) {
    try {
      const userId = request.params.userId;
      const data = await request.file();

      if (!data) {
        return reply.status(400).send({ message: "Nenhum arquivo enviado" });
      }

      const imageUrl = await UploadService.uploadImage(userId, data);

      return reply.send({ message: "Imagem enviada com sucesso", imageUrl });
    } catch (error) {
      return reply.status(500).send({ message: error });
    }
  }
}

export { UploadController };
