import { IsNumber } from "class-validator";

export class CrearEvaluacionDto {
  @IsNumber()
  nota: number;

  @IsNumber()
  proyectoId: number;

  @IsNumber()
  profesorId: number;
}
