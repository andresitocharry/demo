import { EstudianteEntity } from "src/estudiante/estudiante.entity";
import { ProfesorEntity } from "../profesor/profesor.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EvaluacionEntity } from "../evaluacion/evaluacion.entity";

@Entity('proyecto')
export class ProyectoEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    titulo: string;
    @Column()
    area: string;
    @Column()
    presupuesto: number;
    @Column()
    notafinal: number;
    @Column()
    estado: number;
    @Column()   
    fechaInicio:string;
    @Column()
    fechaFin:string;
    @ManyToOne(() => EstudianteEntity, estudiante => estudiante.proyectos)
    lider: EstudianteEntity;

    @ManyToOne(()=> ProfesorEntity , profesor => profesor.mentorias)
    mentor: ProfesorEntity;

    @OneToMany(()=> EvaluacionEntity, evaluacion => evaluacion.proyecto)
    evaluaciones: EvaluacionEntity[];



}
