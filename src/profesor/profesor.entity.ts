import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    



}
