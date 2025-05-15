import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('evaluacion')
export class EvaluacionEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
