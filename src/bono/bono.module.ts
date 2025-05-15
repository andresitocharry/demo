import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity';
import { BonoService } from './bono.service';
import { BonoController } from './bono.controller';
import { UsuarioEntity } from '../usuario/usuario.entity'; // porque lo uso en BonoService

@Module({
  imports: [TypeOrmModule.forFeature([BonoEntity, UsuarioEntity])], // repos a usar
  providers: [BonoService],
  controllers: [BonoController],
  exports: [BonoService], // opcional, solo si se necesita desde otros módulos
})
export class BonoModule {}
