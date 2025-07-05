import { Module } from "@nestjs/common";
import { ContatoModule } from "./contato/contato.module";

@Module({
  imports: [ContatoModule],
})
export class AppModule {}
