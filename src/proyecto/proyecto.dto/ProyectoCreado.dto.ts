import { IsNotEmpty, isNumber, IsNumber, IsString } from "class-validator";

export class ProyectoCreadoDto {

    @IsNotEmpty()
    @IsNumber()
    id: number;

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



    



}
