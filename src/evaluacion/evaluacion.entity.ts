import { ProfesorEntity } from "../profesor/profesor.entity";
import { ProyectoEntity } from "../proyecto/proyecto.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('evaluacion')
export class EvaluacionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nota: number;

    @ManyToOne(() => ProyectoEntity, proyecto => proyecto.evaluaciones)
    proyecto: ProyectoEntity;
    @ManyToOne(()=> ProfesorEntity , profesor => profesor.evaluaciones)
    profesor: ProfesorEntity;
}
