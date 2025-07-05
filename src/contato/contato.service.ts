import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import "dotenv/config";

@Injectable()
export class ContatoService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async enviarContato(nome: string, email: string, mensagem: string) {
    try {
      // Email para a empresa
      await this.transporter.sendMail({
        from: `"Pantabio" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_TO,
        subject: "Novo contato recebido",
        html: `
          <h2>Você recebeu um novo contato:</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensagem:</strong><br/>${mensagem}</p>
        `,
      });

      // Email de confirmação para o cliente
      await this.transporter.sendMail({
        from: `"Equipe Pantabio" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: "Recebemos sua mensagem!",
        html: `
          <p>Olá ${nome},</p>
          <p>Recebemos seu contato e em breve nossa equipe entrará em contato.</p>
          <p><strong>Sua mensagem:</strong></p>
          <blockquote>${mensagem}</blockquote>
          <br/>
          <p>Atenciosamente,<br/>Equipe Pantabio</p>
        `,
      });

      return { ok: true, mensagem: "E-mails enviados com sucesso." };
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Erro ao enviar e-mail:", err.message);
      throw new InternalServerErrorException("Erro ao enviar e-mail.");
    }
  }
}
