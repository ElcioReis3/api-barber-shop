"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerServices = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class CreateCustomerServices {
    async execute({ name, email, address, phone, password, }) {
        if (!name || !email) {
            throw new Error("Preencha todos os campos");
        }
        const emailExists = await prisma_1.default.customer.findUnique({
            where: {
                email,
                phone,
            },
        });
        if (emailExists) {
            throw new Error("Email já cadastrado");
        }
        // Criptografa a senha antes de salvar
        const hashedPassword = await bcrypt_1.default.hash(password, 10); // 10 é o número de "salts" para o bcrypt
        const customer = await prisma_1.default.customer.create({
            data: {
                name,
                email,
                address,
                phone,
                password: hashedPassword,
                status: false,
            },
        });
        return customer;
    }
}
exports.CreateCustomerServices = CreateCustomerServices;
