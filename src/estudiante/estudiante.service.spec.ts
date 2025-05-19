/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { BusinessLogicException } from '../shared/errors/business-errors';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudiante: EstudianteEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    estudiante = await repository.save({
      nombre: faker.name.fullName(),
      promedio: 2.5,
      semestre: 3,
      proyectos: [],
      cedula: parseInt(faker.string.numeric(8)),
      programa: faker.word.words(2)
    });
  };

  it('crearEstudiante debe crear un estudiante (caso positivo)', async () => {
    const nuevoEstudiante: EstudianteEntity = {
      id: 0,
      nombre: faker.name.fullName(),
      promedio: 2.9,
      semestre: 3,
      proyectos: [],
      cedula: parseInt(faker.string.numeric(8)),
      programa: faker.word.words(2)
    };

    const result = await service.crearEstudiante(nuevoEstudiante);
    expect(result).not.toBeNull();

    const stored = await repository.findOne({ where: { id: result.id } });
    expect(stored).not.toBeNull();
    expect(stored!.nombre).toEqual(nuevoEstudiante.nombre);
  });

  it('crearEstudiante debe lanzar excepción si promedio > 3.2 y semestre >= 4 (caso negativo)', async () => {
    const nuevoEstudiante: EstudianteEntity = {
      id: 0,
      nombre: faker.name.fullName(),
      promedio: 3.5,
      semestre: 4,
      proyectos: [],
      cedula: parseInt(faker.string.numeric(8)),
      programa: faker.word.words(2)
    };

    await expect(() => service.crearEstudiante(nuevoEstudiante)).rejects.toBeInstanceOf(BusinessLogicException);
  });

  it('eliminarEstudiante debe eliminar el estudiante (caso positivo)', async () => {
    await service.eliminarEstudiante(estudiante.id);
    const eliminado = await repository.findOne({ where: { id: estudiante.id } });
    expect(eliminado).toBeNull();
  });

  it('eliminarEstudiante debe lanzar excepción si el estudiante no existe (caso negativo)', async () => {
    await expect(() => service.eliminarEstudiante(999)).rejects.toBeInstanceOf(BusinessLogicException);
  });
});
