/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from '../../estudiante/estudiante.entity';
import { EvaluacionEntity } from '../../evaluacion/evaluacion.entity';
import { ProfesorEntity } from '../../profesor/profesor.entity';
import { ProyectoEntity } from '../../proyecto/proyecto.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [EstudianteEntity, EvaluacionEntity, ProyectoEntity, ProfesorEntity],
   synchronize: true
 }),
 TypeOrmModule.forFeature([EstudianteEntity, EvaluacionEntity, ProyectoEntity, ProfesorEntity]),
];