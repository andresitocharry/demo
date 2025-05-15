import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';

import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuariorepository: Repository<UsuarioEntity>
    ) {}



    async crearUsuario(usuario:UsuarioEntity): Promise<UsuarioEntity> {


        if(usuario.rol=='Profesor'){
            const gruposvalidos = ['TICSW', 'IMAGINE', 'COMIT'];
            if(!gruposvalidos.includes(usuario.grupoinvestigacion)){
                throw new BusinessLogicException("El grupo de investigacion no es valido", BusinessError.NOT_FOUND);
            }

        }

        if(usuario.rol=='Decana'){
            const extension = usuario.numeroextension.toString();
            if(extension.length!==8){
                throw new BusinessLogicException("El numero de extension no es valido", BusinessError.NOT_FOUND);
            }
           
        }
        return await this.usuariorepository.save(usuario);
    }


    async findUsuarioById(id: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity | null = await this.usuariorepository.findOne({where: {id}, relations: ["bonos", "clases"] } );
        if (!usuario)
          throw new BusinessLogicException("El usuario con el id dado no fue encontrado", BusinessError.NOT_FOUND);
    
        return usuario;
    }

    async eliminarUsuario(id: string): Promise<void> {
        const usuario = await this.usuariorepository.findOne({
            where: { id },
            relations: ['bonos'],
        });
        if (!usuario)
            throw new BusinessLogicException("El usuario con el id dado no fue encontrado", BusinessError.NOT_FOUND);

        if (usuario.rol === 'Decana') {
            throw new BusinessLogicException("No se puede eliminar un usuario con rol Decana", BusinessError.PRECONDITION_FAILED);
        }

        if(usuario.bonos.length > 0) {
            throw new BusinessLogicException("No se puede eliminar un usuario que tiene bonos asociados", BusinessError.PRECONDITION_FAILED);
        }



        await this.usuariorepository.delete(usuario); // para id , remove para cascadas
    }
}
