import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    
}
