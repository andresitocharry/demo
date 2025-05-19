
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { EvaluacionController } from './evaluacion.controller';
import { ProfesorEntity } from '../profesor/profesor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluacionEntity, ProyectoEntity, ProfesorEntity])],
  providers: [EvaluacionService],
  exports: [EvaluacionService],
  controllers: [EvaluacionController],
})
export class EvaluacionModule {}
