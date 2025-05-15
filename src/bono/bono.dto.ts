import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class BonoDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly monto: number;

  @IsNumber()
  @IsNotEmpty()
  readonly calificacion: number;

  @IsString()
  @IsNotEmpty()
  readonly palabraclave: string;

  @IsUUID()
  @IsNotEmpty()
  readonly usuarioId: string;

  @IsUUID()
  @IsNotEmpty()
  readonly claseId: string;
}
