import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Injectable()
export class BonoService {
    constructor(@InjectRepository(BonoEntity)
                private readonly bonorepository : Repository<BonoEntity> ,
                @InjectRepository(UsuarioEntity)
                private readonly usuariorepository : Repository<UsuarioEntity>) {}

    async crearBono(bono: BonoEntity, usuarioId: string, claseId: string): Promise<BonoEntity> {


        const usuario : UsuarioEntity | null = await this.usuariorepository.findOne({where: {id: usuarioId}, relations: ["bonos"] } ); // relations trae el usuario con sus bonos, sin relations no trae los bonos 
        
        if (!usuario) {
            throw new BusinessLogicException("El usuario no existe", BusinessError.NOT_FOUND);
        }

        if(!bono.monto || bono.monto <= 0 || usuario.rol !== 'Profesor') {
            throw new BusinessLogicException("El bono no puede ser nulo o negativo", BusinessError.NOT_FOUND);
        }

        return await this.bonorepository.save(bono);
    }

    async findBonoById(id: string): Promise<BonoEntity> {
        const bono: BonoEntity | null = await this.bonorepository.findOne({where: {id}} );
        if (!bono)
          throw new BusinessLogicException("El bono con el id dado no fue encontrado", BusinessError.NOT_FOUND);
    
        return bono;
    }

    async findAllBonosByUsuarioId(usuarioId: string): Promise<BonoEntity[]> {
        const usuario: UsuarioEntity | null = await this.usuariorepository.findOne({where: {id: usuarioId}, relations: ["bonos"] } );
        if (!usuario)
          throw new BusinessLogicException("El usuario con el id dado no fue encontrado", BusinessError.NOT_FOUND);
    
        return usuario.bonos;
    }

    async eliminarBono(id: string): Promise<void> {
        const bono: BonoEntity | null = await this.bonorepository.findOne({where:{id}});
        if (!bono)
          throw new BusinessLogicException("El bono con el id dado no fue encontrado", BusinessError.NOT_FOUND);
    
        await this.bonorepository.remove(bono);
    }





}
