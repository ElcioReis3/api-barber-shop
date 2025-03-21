"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentPreference = void 0;
const mercadopago_1 = require("mercadopago");
const mercadopago_2 = require("mercadopago");
const uuid_1 = require("uuid"); // Para gerar um ID único para cada preferência
const client_1 = require("@prisma/client");
const plan_1 = require("../data/plan");
// Instanciando o Prisma Client
const prisma = new client_1.PrismaClient();
const mercadopago = new mercadopago_1.MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
});
const createPaymentPreference = async (title, quantity, price, description) => {
    try {
        const paymentId = (0, uuid_1.v4)();
        const plan = plan_1.plans.find((plan) => plan.title === title);
        if (!plan) {
            throw new Error("Plano não encontrado");
        }
        if (plan.price !== price) {
            throw new Error("Preço inválido.");
        }
        const preferenceData = {
            items: [
                {
                    id: paymentId, // Gera um ID único para cada item
                    title,
                    quantity,
                    description,
                    currency_id: "BRL",
                    unit_price: plan.price,
                },
            ],
            back_urls: {
                success: "https://sua-logoname-barbearia.netlify.app/payment-success",
                failure: "https://sua-logoname-barbearia.netlify.app/payment-failure",
                pending: "https://sua-logoname-barbearia.netlify.app/payment-pending",
            },
            auto_return: "approved",
        };
        // Criar uma preferência de pagamento
        const preference = new mercadopago_2.Preference(mercadopago);
        const response = await preference.create({ body: preferenceData }); // Passando os dados como body
        //return response.init_point;
        return response.sandbox_init_point; // A URL de pagamento
    }
    catch (error) {
        console.error("Erro ao criar pagamento:", error);
        throw new Error("Erro ao processar pagamento");
    }
};
exports.createPaymentPreference = createPaymentPreference;
