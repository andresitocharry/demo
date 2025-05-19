import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { CrearEvaluacionDto } from './evaluacion.dto/evaluacion.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { EvaluacionEntity } from './evaluacion.entity';

@Controller('evaluaciones')
@UseInterceptors(BusinessErrorsInterceptor)
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post('crearevaluacion')
async crearEvaluacion(@Body() dto: CrearEvaluacionDto): Promise<any> {
  console.log('DTO recibido:', dto);
  return await this.evaluacionService.crearEvaluacion(dto);
}


}
