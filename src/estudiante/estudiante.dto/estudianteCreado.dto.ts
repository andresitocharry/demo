
import {IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';
export class EstudianteCreadoDto {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    cedula: string;

    @IsNotEmpty()
    @IsString() 
    nombre: string;

    @IsNotEmpty()
    @IsNumber()
    semestre: number;

    @IsNotEmpty()
    @IsString()
    programa: string;

    @IsNotEmpty()
    @IsNumber()
    promedio: number;



    

}
