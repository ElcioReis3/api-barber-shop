/* import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { FastifyRequest } from "fastify";
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadData {
  file: NodeJS.ReadableStream;
  filename: string;
}

class UploadService {
  async uploadImage(userId: string, data: UploadData): Promise<string> {
    const user = await prisma.customer.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (user.image) {
      const publicId = user.image.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "uploads" },
          (error, result) => {
            if (error || !result) {
              return reject(
                error || new Error("Erro no upload para o Cloudinary")
              );
            }
            resolve(result);
          }
        );

        data.file.pipe(uploadStream);
      }
    );

    const imageUrl = uploadResult.secure_url;

    await prisma.customer.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    return imageUrl;
  }
}

export default new UploadService();
 */
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { FastifyRequest } from "fastify";
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadData {
  file: NodeJS.ReadableStream;
  filename: string;
}

class UploadService {
  async uploadImage(userId: string, data: UploadData): Promise<string> {
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
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "uploads" },
          (error, result) => {
            if (error || !result) {
              return reject(
                error || new Error("Erro no upload para o Cloudinary")
              );
            }
            resolve(result);
          }
        );

        data.file.pipe(uploadStream);
      }
    );

    const imageUrl = uploadResult.secure_url;

    await prisma.customer.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    return imageUrl;
  }
}

export default new UploadService();
