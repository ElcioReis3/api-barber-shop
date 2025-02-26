"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const AuthSigninService_1 = require("../services/AuthSigninService");
const login = async (req, reply) => {
    const { email, password } = req.body;
    try {
        const user = await (0, AuthSigninService_1.authenticateUser)(email, password);
        reply.send({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    }
    catch (error) {
        reply.status(400).send({ error });
    }
};
exports.login = login;
