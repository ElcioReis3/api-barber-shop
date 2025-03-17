"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelPaymentController = void 0;
const routes_1 = require("../routes");
const refundService_1 = require("../services/refundService");
class CancelPaymentController {
    async handle(request, reply) {
        const { user_id } = request.body;
        if (!user_id) {
            return reply.status(400).send({ error: "ID do usuário é obrigatório" });
        }
        // Buscar o cliente para pegar a data de assinatura
        const customer = await routes_1.prisma.customer.findUnique({
            where: { id: user_id },
        });
        if (!customer) {
            return reply.status(404).send({ error: "Cliente não encontrado" });
        }
        const { subscriptionDate } = customer;
        if (!subscriptionDate) {
            return reply
                .status(400)
                .send({ error: "Data de assinatura não disponível" });
        }
        const currentDate = new Date();
        const subscriptionDateObj = new Date(subscriptionDate);
        // Calculando a diferença em dias entre a data de assinatura e a data atual
        const diffTime = currentDate.getTime() - subscriptionDateObj.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24); // Diferença em dias
        let refundType = null;
        if (diffDays <= 7) {
            refundType = "full"; // Reembolso integral
        }
        else if (diffDays <= 15) {
            refundType = "partial"; // Reembolso parcial (50%)
        }
        else {
            refundType = null; // Nenhum reembolso após 15 dias
        }
        if (refundType === null) {
            return reply.status(400).send({ error: "Nenhum reembolso disponível " });
        }
        // Buscar o pagamento associado ao usuário
        const payment = await routes_1.prisma.payment.findFirst({
            where: {
                user_id: user_id,
                used: true,
                status: "approved",
            },
            orderBy: {
                created_at: "desc",
            },
        });
        if (!payment) {
            return reply.status(404).send({ error: "Pagamento não encontrado" });
        }
        // Agora você tem o payment_id e pode usá-lo para o reembolso
        try {
            const refundResponse = await (0, refundService_1.processRefund)(payment.payment_id, refundType);
            // Cancela a assinatura do cliente
            await routes_1.prisma.customer.update({
                where: { id: user_id },
                data: { subscriptionDate: null, dueDate: null, status: false },
            });
            return reply.send({
                message: "Assinatura cancelada com reembolso integral.",
                refund: refundResponse.refund,
            });
        }
        catch (error) {
            console.error("Erro ao processar reembolso:", error);
            return reply.status(500).send({ error: "Erro ao processar reembolso" });
        }
    }
}
exports.CancelPaymentController = CancelPaymentController;
