"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.prisma = new client_1.PrismaClient();
const authenticateUser = async (email, password) => {
    const user = await exports.prisma.customer.findUnique({ where: { email } });
    if (!user)
        throw new Error("Usuário não encontrado");
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    console.log({
        email,
        password,
        userPassword: user.password,
        isPasswordValid,
    });
    if (!isPasswordValid)
        throw new Error("Senha incorreta");
    return user;
};
exports.authenticateUser = authenticateUser;
