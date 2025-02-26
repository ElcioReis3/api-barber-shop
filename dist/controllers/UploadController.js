"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const UploadService_1 = __importDefault(require("../services/UploadService"));
class UploadController {
    async handle(request, reply) {
        try {
            const userId = request.params.userId;
            const data = await request.file();
            if (!data) {
                return reply.status(400).send({ message: "Nenhum arquivo enviado" });
            }
            const imageUrl = await UploadService_1.default.uploadImage(userId, data);
            return reply.send({ message: "Imagem enviada com sucesso", imageUrl });
        }
        catch (error) {
            return reply.status(500).send({ message: error });
        }
    }
}
exports.UploadController = UploadController;
