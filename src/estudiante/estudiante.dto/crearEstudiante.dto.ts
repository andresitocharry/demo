import {IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';
export class CrearEstudianteDto {

    @IsNotEmpty()
    @IsNumber()
    cedula: number;

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
