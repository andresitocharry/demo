import { EvaluacionEntity } from "src/evaluacion/evaluacion.entity";
import { ProyectoEntity } from "../proyecto/proyecto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("profesor")
export class ProfesorEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    cedula: number;
    @Column()
    nombre: string;
    @Column()
    departamento: string;   
    @Column()
    extension : number;
    @Column()
    esParevaluador : boolean;

    @OneToMany(() => ProyectoEntity, proyecto => proyecto.mentor)
    mentorias: ProyectoEntity[];
    
    @OneToMany(()=> EvaluacionEntity, evaluacion => evaluacion.proyecto)
    evaluaciones: EvaluacionEntity[];
    



}
