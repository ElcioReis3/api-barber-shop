"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const util_1 = require("util");
const pump = (0, util_1.promisify)(stream_1.pipeline);
const prisma = new client_1.PrismaClient();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class UploadService {
    async uploadImage(userId, data) {
        const user = await prisma.customer.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        if (user.image) {
            const publicId = user.image
                .split("/")
                .slice(-2)
                .join("/") // Pega a pasta e o nome do arquivo sem a URL completa
                .split(".")[0]; // Remove a extensão
            if (publicId) {
                await cloudinary_1.v2.uploader.destroy(publicId);
            }
        }
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder: "uploads" }, (error, result) => {
                if (error || !result) {
                    return reject(error || new Error("Erro no upload para o Cloudinary"));
                }
                resolve(result);
            });
            data.file.pipe(uploadStream);
        });
        const imageUrl = uploadResult.secure_url;
        await prisma.customer.update({
            where: { id: userId },
            data: { image: imageUrl },
        });
        return imageUrl;
    }
}
exports.default = new UploadService();
