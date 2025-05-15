import { ClaseEntity } from "src/clase/clase.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('bono')
export class BonoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    monto: number;
    @Column('float')
    caligicacion: number;
    @Column()   
    palabraclave: string;

    @ManyToOne(() => ClaseEntity, clase => clase.bonos)
    clase: ClaseEntity;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.bonos)       
    usuario: UsuarioEntity;

}
