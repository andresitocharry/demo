import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { CrearProyectoDto } from './proyecto.dto/proyecto.dto';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectorepository: Repository<ProyectoEntity>,
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ) {}

    async crearProyecto(dto: CrearProyectoDto): Promise<ProyectoEntity> {
        const { presupuesto, titulo, liderId, mentorId } = dto;

        if (presupuesto < 0) {
            throw new BusinessLogicException("El presupuesto no es valido", BusinessError.NOT_FOUND);
        }
        if (titulo.length < 15) {
            throw new BusinessLogicException("El titulo no es valido", BusinessError.NOT_FOUND);
        }

        const lider = await this.estudianteRepository.findOne({ where: { id: liderId } });
        if (!lider) {
            throw new BusinessLogicException("El estudiante líder no fue encontrado", BusinessError.NOT_FOUND);
        }

        const mentor = await this.profesorRepository.findOne({ where: { id: mentorId } });
        if (!mentor) {
            throw new BusinessLogicException("El profesor mentor no fue encontrado", BusinessError.NOT_FOUND);
        }

        const proyecto = this.proyectorepository.create({
            ...dto,
            lider,
            mentor
        });

        return await this.proyectorepository.save(proyecto);
    }

    async avanzarProyectio(id: number): Promise<ProyectoEntity> {
        const proyecto = await this.proyectorepository.findOne({ where: { id } });
        if (!proyecto) {
            throw new BusinessLogicException("El proyecto con el id dado no fue encontrado", BusinessError.NOT_FOUND);
        }

        if (proyecto.estado < 0 || proyecto.estado > 4) {
            throw new BusinessLogicException("El proyecto no puede avanzar", BusinessError.NOT_FOUND);
        }

        proyecto.estado += 1;
        return await this.proyectorepository.save(proyecto);
    }

    async findAll(): Promise<ProyectoEntity[]> {
        return await this.proyectorepository.find({
            relations: ['lider', 'mentor', 'evaluaciones']
        });
    }

    async findAllEstudiantes(id: number): Promise<ProyectoEntity[]> {
        const proyecto = await this.proyectorepository.findOne({ where: { id }, relations: ['lider'] });
        if (!proyecto) {
            throw new BusinessLogicException("El proyecto con el id dado no fue encontrado", BusinessError.NOT_FOUND);
        }
        console.log(proyecto);

        if (!proyecto.lider) {
            throw new BusinessLogicException("El proyecto no tiene estudiantes", BusinessError.NOT_FOUND);
        }

        return await this.proyectorepository.find({ where: { id }, relations: ['lider'] });
    }
}
