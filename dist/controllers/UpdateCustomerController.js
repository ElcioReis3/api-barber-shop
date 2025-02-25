import { UpdateCustomerServices } from "../services/UpdateCustomerServices";
class UpdateCustomerController {
    async handle(request, reply) {
        const { id } = request.query;
        const { name, email, address, phone, password, status, dueDate, plan } = request.body;
        const customerService = new UpdateCustomerServices();
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
            });
            return reply.status(200).send(updatedCustomer);
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
}
export { UpdateCustomerController };
