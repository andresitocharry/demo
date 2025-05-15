import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseEntity } from './clase.entity';
import { ClaseService } from './clase.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClaseEntity])], //  Esto es obligatorio
  providers: [ClaseService],
  exports: [ClaseService], // opcional, solo si usas ClaseService en otros módulos
})
export class ClaseModule {}
