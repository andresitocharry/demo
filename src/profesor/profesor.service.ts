import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';

@Injectable()
export class ProfesorService {
constructor(@InjectRepository(ProfesorEntity)
            private readonly profesorepository : Repository<ProfesorEntity>,
            @InjectRepository(EvaluacionEntity)
            private readonly evaluacionrepository : Repository<EvaluacionEntity>) {}

            async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
            const extension = profesor.extension.toString();
            if(extension.length !== 5) {
                throw new BusinessLogicException("El numero de extension no es valido", BusinessError.NOT_FOUND);


            }
            return await this.profesorepository.save(profesor);
        }


        async asignarEvaluador(id: number, idEvaluador: number): Promise<ProfesorEntity> {
    const profesor = await this.profesorepository.findOne({
        where: { id: Number(id) },
        relations: ['evaluaciones']  
    });

    if (!profesor)
        throw new BusinessLogicException("El profesor con el id dado no fue encontrado", BusinessError.NOT_FOUND);

    const evaluador = await this.evaluacionrepository.findOne({
        where: { id: Number(idEvaluador) },
        relations: ['profesor'] 
    });

    if (!evaluador)
        throw new BusinessLogicException("El evaluador con el id dado no fue encontrado", BusinessError.NOT_FOUND);

    if (profesor.evaluaciones && profesor.evaluaciones.length >= 3) {
        throw new BusinessLogicException("El profesor no puede tener más de 3 evaluaciones activas", BusinessError.NOT_FOUND);
    }

    profesor.evaluaciones.push(evaluador);
    return await this.profesorepository.save(profesor);
}



}
