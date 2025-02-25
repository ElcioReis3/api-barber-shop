import { DeleteCustomerServices } from "../services/DeleteCustomerServices";
class DeleteCustomerController {
    async handle(request, reply) {
        const { id } = request.query;
        const deleteCustomerService = new DeleteCustomerServices();
        const customer = await deleteCustomerService.execute({
            id,
        });
        reply.send(customer);
    }
}
export { DeleteCustomerController };
