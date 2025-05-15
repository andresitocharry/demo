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

@Module({
  imports: [

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
