"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const fastify_multer_1 = __importDefault(require("fastify-multer"));
const path_1 = __importDefault(require("path"));
// Configuração do armazenamento
const storage = fastify_multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname)); // Renomeia a imagem
    },
});
exports.upload = (0, fastify_multer_1.default)({ storage });
