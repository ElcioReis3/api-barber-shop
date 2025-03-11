"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authEmailService_1 = require("../services/authEmailService");
const forgotPassword = async (request, reply) => {
    const { email } = request.body;
    try {
        const user = await prisma_1.default.customer.findUnique({ where: { email } });
        if (!user) {
            return reply.send({
                message: "E-mail de recuperação enviado com sucesso!",
            });
        }
        const resetToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        await prisma_1.default.customer.update({
            where: { email },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpires: new Date(Date.now() + 3600 * 1000),
            },
        });
        await (0, authEmailService_1.sendPasswordResetEmail)(email, resetToken);
        reply.send({ message: "E-mail de recuperação enviado com sucesso!" });
    }
    catch (error) {
        console.error("Erro ao processar a solicitação. " + error);
        reply.status(500).send({ message: "Erro ao processar a solicitação." });
    }
};
exports.forgotPassword = forgotPassword;
