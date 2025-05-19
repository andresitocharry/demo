import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ProfesorEntity } from './profesor/profesor.entity';
import { EvaluacionEntity } from './evaluacion/evaluacion.entity';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity';


import { EstudianteModule } from './estudiante/estudiante.module';

import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/Profesor.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { ControllerController } from './controller/controller.controller';

@Module({
  imports: [
    EvaluacionModule,
    EstudianteModule,
    ProfesorModule,
    ProyectoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'museum',
      entities: [
  
        ProfesorEntity,
        EvaluacionEntity,
        EstudianteEntity,
        ProyectoEntity,
      ],
      dropSchema: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController, ControllerController],
  providers: [AppService],
})
export class AppModule {}
