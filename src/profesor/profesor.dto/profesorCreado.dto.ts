import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProfesorCreadoDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

      @IsNotEmpty()
    @IsNumber()
    cedula: number;

      @IsNotEmpty()
    @IsString()
    nombre: string;

    departamento: string;

      @IsNotEmpty()
    @IsNumber()
    extension: number;

    @IsNotEmpty()
    @IsBoolean()

    esParevaluador: boolean;
}