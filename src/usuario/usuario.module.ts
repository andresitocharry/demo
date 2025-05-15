import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])], // ✅ ESTO ES CLAVE
  providers: [UsuarioService],
  exports: [UsuarioService], // opcional, si lo usas en otros módulos
})
export class UsuarioModule {}
