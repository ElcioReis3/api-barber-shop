"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerController = void 0;
const UpdateCustomerServices_1 = require("../services/UpdateCustomerServices");
class UpdateCustomerController {
    async handle(request, reply) {
        const { id } = request.query;
        const { name, email, address, phone, password, status, dueDate, plan, subscriptionDate, } = request.body;
        const customerService = new UpdateCustomerServices_1.UpdateCustomerServices();
        try {
            const updatedCustomer = await customerService.execute({
                id,
                name,
                email,
                address,
                phone,
                plan,
                password,
                status,
                dueDate,
                subscriptionDate,
            });
            return reply.status(200).send(updatedCustomer);
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
}
exports.UpdateCustomerController = UpdateCustomerController;
