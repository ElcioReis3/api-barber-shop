"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const stream_1 = require("stream");
const util_1 = require("util");
const pump = (0, util_1.promisify)(stream_1.pipeline);
const prisma = new client_1.PrismaClient();
class UploadService {
    uploadDir = path_1.default.join(__dirname, "../../uploads");
    constructor() {
        if (!fs_1.default.existsSync(this.uploadDir)) {
            fs_1.default.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    async uploadImage(userId, data) {
        // Verifica se o usuário existe no banco
        const user = await prisma.customer.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        // Excluir a imagem anterior, se existir
        if (user.image) {
            const oldImagePath = path_1.default.join(__dirname, "../../", user.image);
            if (fs_1.default.existsSync(oldImagePath)) {
                fs_1.default.unlinkSync(oldImagePath);
            }
        }
        // Criando um nome único para a nova imagem
        const newFileName = `${userId}-${Date.now()}-${data.filename}`;
        const filePath = path_1.default.join(this.uploadDir, newFileName);
        // Salvando a nova imagem na pasta uploads
        //await pump(data.file, fs.createWriteStream(filePath));
        await pump(data.file, fs_1.default.createWriteStream(filePath)).catch((err) => {
            throw new Error(`Erro ao gravar arquivo: ${err.message}`);
        });
        // Criando a URL para salvar no banco
        const imageUrl = `/uploads/${newFileName}`;
        // Atualizando o usuário no banco de dados
        await prisma.customer.update({
            where: { id: userId },
            data: { image: imageUrl },
        });
        return imageUrl;
    }
}
exports.default = new UploadService();
