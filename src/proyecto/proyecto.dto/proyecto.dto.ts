import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CrearProyectoDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsString()
    area: string;

    @IsNotEmpty()
    @IsNumber()
    presupuesto: number;

    @IsNotEmpty()
    @IsNumber()
    notafinal: number;

    @IsNotEmpty()
    @IsNumber()
    estado: number;

    @IsNotEmpty()
    @IsString()
    fechaInicio: string;

    @IsNotEmpty()
    @IsString()
    fechaFin: string;

    @IsNotEmpty()
    @IsNumber()
    liderId: number;

    @IsNotEmpty()
    @IsNumber()
    mentorId: number;
}
