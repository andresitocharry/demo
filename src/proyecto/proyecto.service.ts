import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ProyectoService {
    constructor(@InjectRepository(ProyectoEntity)   
                private readonly proyectorepository : Repository<ProyectoEntity>) {}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        const presupuesto = proyecto.presupuesto;
        const titulo = proyecto.titulo;
        if(presupuesto < 0) {
            throw new BusinessLogicException("El presupuesto no es valido", BusinessError.NOT_FOUND);
        }
        if(titulo.length < 15) {
            throw new BusinessLogicException("El titulo no es valido", BusinessError.NOT_FOUND);
        }
        return await this.proyectorepository.save(proyecto);}

    async avanzarProyectio(id:number ) : Promise<ProyectoEntity> {
        const proyecto: ProyectoEntity | null = await this.proyectorepository.findOne({where: {id: Number(id)}} );
        if (!proyecto)
          throw new BusinessLogicException("El proyecto con el id dado no fue encontrado", BusinessError.NOT_FOUND);
    
        const proyectoestado = proyecto.estado;

        if (proyectoestado < 0 || proyectoestado > 4) {
            throw new BusinessLogicException("El proyecto no puede avanzar", BusinessError.NOT_FOUND);
        }
        proyecto.estado = proyectoestado + 1;
        return await this.proyectorepository.save(proyecto);

    }

    async findAllEstudiantes(id: number): Promise<ProyectoEntity[]> {
        const proyecto: ProyectoEntity | null = await this.proyectorepository.findOne({where: {id: Number(id)}} );
        if (!proyecto)
          throw new BusinessLogicException("El proyecto con el id dado no fue encontrado", BusinessError.NOT_FOUND);
    
        let estudiantes = proyecto.lider;
        if (!estudiantes || (Array.isArray(estudiantes) && estudiantes.length === 0)) {
            throw new BusinessLogicException("El proyecto no tiene estudiantes", BusinessError.NOT_FOUND);
        }
        return await this.proyectorepository.find({ where: { id: Number(id) }, relations: ['lider'] });
    }
        

}
