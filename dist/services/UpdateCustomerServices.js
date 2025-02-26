"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerServices = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class UpdateCustomerServices {
    async execute({ id, name, email, address, phone, plan, password, status, dueDate, }) {
        if (!id) {
            throw new Error("ID do cliente é obrigatório");
        }
        const customerExists = await prisma_1.default.customer.findUnique({
            where: {
                id,
            },
        });
        if (!customerExists) {
            throw new Error("Cliente não encontrado");
        }
        // Atualiza somente os campos enviados
        const updatedCustomer = await prisma_1.default.customer.update({
            where: { id },
            data: {
                name: name || customerExists.name,
                email: email || customerExists.email,
                address: address || customerExists.address,
                phone: phone || customerExists.phone,
                plan: plan || customerExists.plan,
                password: password || customerExists.password,
                status: status !== undefined ? status : customerExists.status,
                dueDate: dueDate || customerExists.dueDate,
            },
        });
        return updatedCustomer;
    }
}
exports.UpdateCustomerServices = UpdateCustomerServices;
