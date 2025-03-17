"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRefund = processRefund;
const axios_1 = __importDefault(require("axios"));
/**
 * Processa o reembolso de um pagamento no Mercado Pago.
 * @param paymentId ID do pagamento no Mercado Pago.
 * @param type Tipo de reembolso: "full" (integral) ou "partial" (parcial).
 */
async function processRefund(paymentId, type) {
    try {
        const refundAmount = type === "full" ? 0 : 50; // Define valor para reembolso parcial (exemplo: 50% do total)
        const response = await axios_1.default.post(`https://api.mercadopago.com/v1/payments/${paymentId}/refunds`, refundAmount ? { amount: refundAmount } : {}, // Envia o valor apenas se for parcial
        {
            headers: {
                Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`, // Token do Mercado Pago
            },
        });
        console.log(`Reembolso ${type} realizado com sucesso:`, response.data);
        // Retorne a resposta no formato que você deseja no frontend
        return {
            refund: response.data,
            message: `Reembolso ${type} realizado com sucesso`,
        };
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao processar reembolso:", error.message);
            throw new Error("Erro ao processar reembolso: " + error.message);
        }
        else {
            console.error("Erro desconhecido:", error);
            throw new Error("Erro desconhecido ao processar reembolso");
        }
    }
}
