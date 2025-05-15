import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ) {}

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        const promedio = estudiante.promedio;
        const semestre = estudiante.semestre;
        if(promedio > 3.2 && semestre >= 4) {
            throw new BusinessLogicException("El promedio del estudiante no es valido", BusinessError.NOT_FOUND);
        }
        return await this.estudianteRepository.save(estudiante);

    }


    async eliminarEstudiante(id: number): Promise<void> {
        const estudiante  = await this.estudianteRepository.findOne({ where: { id: Number(id) } });
        if (!estudiante) {
            throw new BusinessLogicException("El estudiante no fue encontrado", BusinessError.NOT_FOUND);
        }
        const proyectos = estudiante.proyectos;
        if (proyectos.length > 0) {
            throw new  BusinessLogicException("El estudiante no puede ser eliminado porque tiene proyectos activs", BusinessError.NOT_FOUND);
        }
        await this.estudianteRepository.delete(estudiante);

    }

}
