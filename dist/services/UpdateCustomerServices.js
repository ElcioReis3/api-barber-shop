import prismaClient from "../prisma/index.js";
class UpdateCustomerServices {
    async execute({ id, name, email, address, phone, plan, password, status, dueDate, }) {
        if (!id) {
            throw new Error("ID do cliente é obrigatório");
        }
        const customerExists = await prismaClient.customer.findUnique({
            where: {
                id,
            },
        });
        if (!customerExists) {
            throw new Error("Cliente não encontrado");
        }
        // Atualiza somente os campos enviados
        const updatedCustomer = await prismaClient.customer.update({
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
export { UpdateCustomerServices };
