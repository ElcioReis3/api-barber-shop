import { ListCustomerServices } from "../services/ListCustomerServices";
class ListCustomerController {
    async handle(request, reply) {
        const listCustomerServices = new ListCustomerServices();
        const customers = await listCustomerServices.execute();
        reply.send(customers);
    }
}
export { ListCustomerController };
