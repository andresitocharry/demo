import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoDto } from './bono.dto'; 
import { BonoEntity } from './bono.entity';
import { plainToInstance } from 'class-transformer';

@Controller('bonos')
export class BonoController {
  constructor(private readonly bonoService: BonoService) {}

  // Crear bono
 @Post()
async crearBono(@Body() bonoDto: BonoDto): Promise<BonoEntity> {
  const bono = plainToInstance(BonoEntity, bonoDto);

  return await this.bonoService.crearBono(bono, bonoDto.usuarioId, bonoDto.claseId);
}


  // Buscar bono por código
  @Get('codigo/:codigo')
  async findBonoByCodigo(@Param('codigo') codigo: string): Promise<BonoEntity> {
    return await this.bonoService.findBonoById(codigo);
  }

  // Buscar todos los bonos de un usuario
  @Get('usuario/:userId')
  async findAllBonosByUsuario(@Param('userId') userId: string): Promise<BonoEntity[]> {
    return await this.bonoService.findAllBonosByUsuarioId(userId);
  }

  // Eliminar bono por ID
  @Delete(':id')
  async deleteBono(@Param('id') id: string): Promise<void> {
    return await this.bonoService.eliminarBono(id);
  }
}
