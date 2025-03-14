"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCustomerServices = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ListCustomerServices {
    async execute() {
        const customersList = await prisma_1.default.customer.findMany();
        return customersList;
    }
}
exports.ListCustomerServices = ListCustomerServices;
