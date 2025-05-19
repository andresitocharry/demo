import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class crearProfesorDto {

    @IsNotEmpty()
    @IsNumber()
    cedula: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    departamento: string;

    @IsNotEmpty()
    @IsNumber()
    extension: number;

    @IsNotEmpty()
    @IsBoolean()
    esParevaluador: boolean;

    
}
