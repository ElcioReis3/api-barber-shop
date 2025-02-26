"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCustomerController = void 0;
const ListCustomerServices_1 = require("../services/ListCustomerServices");
class ListCustomerController {
    async handle(request, reply) {
        const listCustomerServices = new ListCustomerServices_1.ListCustomerServices();
        const customers = await listCustomerServices.execute();
        reply.send(customers);
    }
}
exports.ListCustomerController = ListCustomerController;
