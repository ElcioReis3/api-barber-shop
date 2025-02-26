import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);
const prisma = new PrismaClient();

class UploadService {
  private uploadDir = path.join(__dirname, "../../uploads");

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadImage(userId: string, data: any) {
    // Verifica se o usuário existe no banco
    const user = await prisma.customer.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // Excluir a imagem anterior, se existir
    if (user.image) {
      const oldImagePath = path.join(__dirname, "../../", user.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Criando um nome único para a nova imagem
    const newFileName = `${userId}-${Date.now()}-${data.filename}`;
    const filePath = path.join(this.uploadDir, newFileName);

    // Salvando a nova imagem na pasta uploads
    //await pump(data.file, fs.createWriteStream(filePath));
    await pump(data.file, fs.createWriteStream(filePath)).catch((err) => {
      throw new Error(`Erro ao gravar arquivo: ${err.message}`);
    });

    // Criando a URL para salvar no banco
    const imageUrl = `/uploads/${newFileName}`;

    // Atualizando o usuário no banco de dados
    await prisma.customer.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    return imageUrl;
  }
}

export default new UploadService();
