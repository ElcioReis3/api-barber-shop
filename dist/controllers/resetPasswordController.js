"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.prisma = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
// Instanciando o Prisma Client
exports.prisma = new client_1.PrismaClient();
const resetPassword = async (request, reply) => {
    const { token, password } = request.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await exports.prisma.customer.findUnique({
            where: { id: decoded.userId },
        });
        if (!user || user.resetPasswordToken !== token) {
            return reply.status(400).send({ message: "Token inválido ou expirado." });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await exports.prisma.customer.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });
        reply.send({ message: "Senha redefinida com sucesso!" });
    }
    catch (error) {
        console.error("Erro ao redefinir a senha:", error);
        reply.status(500).send({ message: "Erro ao redefinir a senha." });
    }
};
exports.resetPassword = resetPassword;
