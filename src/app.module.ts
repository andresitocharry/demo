import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MuseumModule } from './museum/museum.module';
import { ExhibitionModule } from './exhibition/exhibition.module';
import { ArtworkModule } from './artwork/artwork.module';
import { ArtistModule } from './artist/artist.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { ImageModule } from './image/image.module';
import { MovementModule } from './movement/movement.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistEntity } from './artist/artist.entity';
import { ArtworkEntity } from './artwork/artwork.entity';
import { ExhibitionEntity } from './exhibition/exhibition.entity';
import { ImageEntity } from './image/image.entity';
import { MovementEntity } from './movement/movement.entity';
import { MuseumEntity } from './museum/museum.entity';
import { SponsorEntity } from './sponsor/sponsor.entity';
import { UsuarioEntity } from './usuario/usuario.entity';
import { BonoEntity } from './bono/bono.entity';
import { ClaseEntity } from './clase/clase.entity';
import { ProfesorEntity } from './profesor/profesor.entity';
import { EvaluacionEntity } from './evaluacion/evaluacion.entity';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity';

import { UsuarioModule } from './usuario/usuario.module';
import { ClaseModule } from './clase/clase.module';
import { BonoModule } from './bono/bono.module';
import { EstudianteModule } from './estudiante/estudiante.module';

import { ProyectoModule } from './proyecto/proyecto.module';
import { ProfesorModule } from './profesor/Profesor.module';

@Module({
  imports: [
    MuseumModule,
    ExhibitionModule,
    ArtworkModule,
    ArtistModule,
    SponsorModule,
    ImageModule,
    MovementModule,
    UsuarioModule,
    ClaseModule,
    BonoModule,
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
        ArtistEntity,
        ArtworkEntity,
        ExhibitionEntity,
        ImageEntity,
        MovementEntity,
        MuseumEntity,
        SponsorEntity,
        UsuarioEntity,
        BonoEntity,
        ClaseEntity,
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
