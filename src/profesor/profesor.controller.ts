import { Body, Controller, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { plainToInstance } from 'class-transformer';
import { ProfesorCreadoDto } from './profesor.dto/profesorCreado.dto';
import { crearProfesorDto } from './profesor.dto/crearProfesor.dto';

@Controller('profesores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
    constructor( private readonly profesorService: ProfesorService) {}

    @Post('crearprofesor')
    async crearProfesor(
        @Body() profesorDto: crearProfesorDto): Promise<ProfesorCreadoDto> {
        const profesor: ProfesorEntity = plainToInstance(ProfesorEntity, profesorDto);
        const creado = await this.profesorService.crearProfesor(profesor);
        return plainToInstance(ProfesorCreadoDto, creado);
    }

    @Put(':id/asignarevaluacion/:idEvaluador')
    async asignarEvaluador(
    @Param('id') id: number,
    @Param('idEvaluador') idEvaluador: number,
    ): Promise<ProfesorCreadoDto> {
    const profesorActualizado = await this.profesorService.asignarEvaluador(id, idEvaluador);
    return plainToInstance(ProfesorCreadoDto, profesorActualizado);
    }

    




}
