import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { Repository } from 'typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { CrearEvaluacionDto } from './evaluacion.dto/evaluacion.dto';

@Injectable()
export class EvaluacionService {
    constructor(@InjectRepository(EvaluacionEntity)
                private readonly evaluacionRepository : Repository<EvaluacionEntity>,
                @InjectRepository(ProyectoEntity)
                private readonly proyectoRepository : Repository<ProyectoEntity>,
                @InjectRepository(ProfesorEntity) 
                private readonly profesorRepository : Repository<ProfesorEntity>) {}     

    async crearEvaluacion(dto: CrearEvaluacionDto): Promise<EvaluacionEntity> {
  const { nota, proyectoId, profesorId } = dto;

  if (nota < 0 || nota > 5) {
    throw new BusinessLogicException("La nota no es válida", BusinessError.NOT_FOUND);
  }

  const proyecto = await this.proyectoRepository.findOne({
    where: { id: proyectoId },
    relations: ['mentor'] 
  });

  if (!proyecto) {
    throw new BusinessLogicException("Proyecto no encontrado", BusinessError.NOT_FOUND);
  }

  const profesor = await this.profesorRepository.findOne({
    where: { id: profesorId }
  });

  if (!profesor) {
    throw new BusinessLogicException("Profesor evaluador no encontrado", BusinessError.NOT_FOUND);
  }

  if (proyecto.mentor?.id === profesor.id) {
    throw new BusinessLogicException("El mentor no puede ser evaluador", BusinessError.NOT_FOUND);
  }

  const evaluacion = new EvaluacionEntity();
  evaluacion.nota = nota;
  evaluacion.proyecto = proyecto;
  evaluacion.profesor = profesor;

  return await this.evaluacionRepository.save(evaluacion);
}
}
