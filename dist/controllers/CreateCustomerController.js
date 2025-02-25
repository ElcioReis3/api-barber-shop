import { CreateCustomerServices } from "../services/CreateCustomerServices.js";
class CreateCustomerController {
    async handle(request, reply) {
        const { name, email, address, phone, password } = request.body;
        const customerService = new CreateCustomerServices();
        const customer = await customerService.execute({
            name,
            email,
            address,
            phone,
            password,
        });
        reply.send(customer);
    }
}
export { CreateCustomerController };
