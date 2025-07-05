import { Controller, Post, Body } from "@nestjs/common";
import { ContatoService } from "./contato.service";

@Controller("contato")
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  @Post()
  async enviar(
    @Body() body: { nome: string; email: string; mensagem: string },
  ) {
    const { nome, email, mensagem } = body;
    return await this.contatoService.enviarContato(nome, email, mensagem);
  }
}
