"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerServices = void 0;
const index_1 = __importDefault(require("../prisma/index"));
class CreateCustomerServices {
    async execute({ name, email, address, phone, password, }) {
        if (!name || !email) {
            throw new Error("Preencha todos os campos");
        }
        const emailExists = await index_1.default.customer.findUnique({
            where: {
                email,
                phone,
            },
        });
        if (emailExists) {
            throw new Error("Email já cadastrado");
        }
        const customer = await index_1.default.customer.create({
            data: {
                name,
                email,
                address,
                phone,
                password,
                status: false,
            },
        });
        return customer;
    }
}
exports.CreateCustomerServices = CreateCustomerServices;
