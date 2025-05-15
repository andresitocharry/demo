import { en } from "@faker-js/faker/.";
import { E } from "@faker-js/faker/dist/airline-BUL6NtOJ";
import { BonoEntity } from "src/bono/bono.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity("clase")
export class ClaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    nombre: string;
    @Column()
    codigo: string;
    @Column()
    creditos: number;

    @OneToMany(() => BonoEntity, bono => bono.clase)
    bonos: BonoEntity[];

    @ManyToOne(() => UsuarioEntity, usuario => usuario.clases)  
    usuario: UsuarioEntity;
    
    

}
