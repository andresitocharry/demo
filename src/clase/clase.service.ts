import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClaseEntity } from './clase.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

import { Repository } from 'typeorm';

@Injectable()
export class ClaseService {

    constructor(@InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity> ) {}

    async crearClase(clase: ClaseEntity): Promise<ClaseEntity> {
        const codigo = clase.codigo;
        if(!codigo || codigo.length !== 10) {
            throw new BusinessLogicException("El codigo de la clase no es valido", BusinessError.NOT_FOUND);
        }
        return await this.claseRepository.save(clase);
    }
    async findClaseById(id: string): Promise<ClaseEntity> {
        const clase: ClaseEntity | null = await this.claseRepository.findOne({where: {id}} );
        if (!clase)
          throw new BusinessLogicException("La clase con el id dado no fue encontrada", BusinessError.NOT_FOUND);
    
        return clase;
    }
}



