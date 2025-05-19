import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity, ProfesorEntity, EstudianteEntity])],
  providers: [ProyectoService],
  exports: [ProyectoService],
  controllers: [ProyectoController], 
})
export class ProyectoModule {}
