import { Body, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CrearProyectoDto } from './proyecto.dto/proyecto.dto';
import { ProyectoEntity } from './proyecto.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ProyectoCreadoDto } from './proyecto.dto/ProyectoCreado.dto';

@Controller('proyectos')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}

    @Post('crearproyecto')
    async crearProyecto(@Body() proyectoDTO: CrearProyectoDto): Promise<ProyectoEntity> {
        return await this.proyectoService.crearProyecto(proyectoDTO);
    }

    @Put(':id/avanzar')
    async avanzarProyecto(@Param('id') id: number): Promise<ProyectoCreadoDto> {
        return await this.proyectoService.avanzarProyectio(id);
    }

    @Get(':id/estudiantes')
    async findAllEstudiantes(@Param('id') id: number): Promise<ProyectoEntity[]> {
        return await this.proyectoService.findAllEstudiantes(id);
    }
}
