import { IsNumber, IsString } from 'class-validator';

export class EstudianteDto {
  @IsNumber()
  id: number;

  @IsNumber()
  cedula: number;

  @IsString()
  nombre: string;

  @IsNumber()
  semestre: number;

  @IsString()
  programa: string;

  @IsNumber()
  promedio: number;
}
