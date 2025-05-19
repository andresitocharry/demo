/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { BusinessLogicException } from '../shared/errors/business-errors';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let profesorRepository: Repository<ProfesorEntity>;
  let evaluacionRepository: Repository<EvaluacionEntity>;

  let profesor: ProfesorEntity;
  let evaluacion: EvaluacionEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    profesorRepository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    evaluacionRepository = module.get<Repository<EvaluacionEntity>>(getRepositoryToken(EvaluacionEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await evaluacionRepository.clear();
    await profesorRepository.clear();

    profesor = await profesorRepository.save({
      nombre: faker.name.fullName(),
      cedula: parseInt(faker.string.numeric(8)),
      departamento: 'Ciencias',
      extension: 12345,
      evaluaciones: []
    });

    evaluacion = await evaluacionRepository.save({
      nota: 4,
      profesor: profesor,
      proyecto: undefined // si tu entidad requiere proyecto, ajusta aquí
    });
  };

  it('crearProfesor debe crear un profesor con extensión válida (caso positivo)', async () => {
    const nuevoProfesor: ProfesorEntity = {
      id: 0,
      nombre: faker.name.fullName(),
      cedula: parseInt(faker.string.numeric(8)),
      departamento: 'Matemáticas',
      extension: 54321,
      evaluaciones: [],
      esParevaluador: false,
      mentorias: []
    };

    const result = await service.crearProfesor(nuevoProfesor);
    expect(result).not.toBeNull();

    const stored = await profesorRepository.findOne({ where: { id: result.id } });
    expect(stored).not.toBeNull();
    expect(stored!.nombre).toEqual(nuevoProfesor.nombre);
    expect(stored!.extension).toEqual(nuevoProfesor.extension);
  });

  it('crearProfesor debe lanzar excepción si extensión no tiene 5 dígitos (caso negativo)', async () => {
    const nuevoProfesor: ProfesorEntity = {
      id: 0,
      nombre: faker.name.fullName(),
      cedula: parseInt(faker.string.numeric(8)),
      departamento: 'Matemáticas',
      extension: 1234, // inválida
      evaluaciones: [],
      esParevaluador: false,
      mentorias: []
    };

    await expect(() => service.crearProfesor(nuevoProfesor)).rejects.toBeInstanceOf(BusinessLogicException);
  });

  it('asignarEvaluador debe asignar una evaluacion si profesor tiene menos de 3 evaluaciones (caso positivo)', async () => {
    // Usamos el profesor y evaluacion creados en seedDatabase
    const result = await service.asignarEvaluador(profesor.id, evaluacion.id);
    expect(result.evaluaciones).toContainEqual(expect.objectContaining({ id: evaluacion.id }));
  });

  it('asignarEvaluador debe lanzar excepción si profesor no existe (caso negativo)', async () => {
    await expect(() => service.asignarEvaluador(9999, evaluacion.id)).rejects.toBeInstanceOf(BusinessLogicException);
  });

  it('asignarEvaluador debe lanzar excepción si evaluador no existe (caso negativo)', async () => {
    await expect(() => service.asignarEvaluador(profesor.id, 9999)).rejects.toBeInstanceOf(BusinessLogicException);
  });

  it('asignarEvaluador debe lanzar excepción si profesor ya tiene 3 evaluaciones (caso negativo)', async () => {
    // Primero creamos 3 evaluaciones nuevas para asignar
    const eval1 = await evaluacionRepository.save({ nota: 3.0, profesor: profesor, proyecto: undefined });
    const eval2 = await evaluacionRepository.save({ nota: 3.5, profesor: profesor, proyecto: undefined });
    const eval3 = await evaluacionRepository.save({ nota: 4.0, profesor: profesor, proyecto: undefined });

    // actualizamos profesor con estas evaluaciones (podría ser mejor recargar)
    profesor.evaluaciones = [eval1, eval2, eval3];
    await profesorRepository.save(profesor);

    await expect(() => service.asignarEvaluador(profesor.id, evaluacion.id)).rejects.toBeInstanceOf(BusinessLogicException);
  });
});
