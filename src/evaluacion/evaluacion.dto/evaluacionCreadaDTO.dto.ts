import { IsNotEmpty, IsNumber } from "class-validator";

export class EvaluacionCreadaDto {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    nota    : number;


}
