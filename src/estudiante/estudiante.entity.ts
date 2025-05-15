import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('estudiante')
export class EstudianteEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    cedula : number;
    @Column()   
    nombre : string;
    @Column()
    semestre : number;
    @Column()
    programa : string;  
    @Column()   
    promedio : number;



}
