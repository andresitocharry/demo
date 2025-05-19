import { Body, Controller, Delete, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { EstudianteService } from './estudiante.service';
import { CrearEstudianteDto } from './estudiante.dto/crearEstudiante.dto';
import { EstudianteEntity } from './estudiante.entity';
import { plainToInstance } from 'class-transformer';
import { EstudianteCreadoDto } from './estudiante.dto/estudianteCreado.dto';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {

    constructor(private readonly estudianteService: EstudianteService)  {}


@Post('crearestudiante')
async crearEstudiante(
  @Body() estudiantedto: CrearEstudianteDto
): Promise<EstudianteCreadoDto> {
  const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudiantedto);
  const creado = await this.estudianteService.crearEstudiante(estudiante);
  return plainToInstance(EstudianteCreadoDto, creado);
}

@Delete(':id')
async eliminarEstudiante(@Param('id') id: number): Promise<void> {
  return await this.estudianteService.eliminarEstudiante(id);
}


}
