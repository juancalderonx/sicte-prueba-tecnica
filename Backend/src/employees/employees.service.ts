import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger('EmployeesService');

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    this.logger.log('Estamos en el Servicio Create.');

    const { personalEmail, corporativeEmail, dni, ...employeeDetails } =
      createEmployeeDto;

    // Valida si ya existe uno de los dos correos electrónicos en la base de datos
    const existingEmails = await this.employeeRepository.findOne({
      where: [{ personalEmail }, { corporativeEmail }],
    });

    const existingDni = await this.employeeRepository.findOne({
      where: [{ dni }],
    });

    if (existingDni) {
      throw new BadRequestException(
        `El DNI ingresado ya existe en el sistema, digita otro, si crees que es un error, comunícate con un administrador.`,
      );
    }

    if (existingEmails) {
      throw new BadRequestException(
        `Uno de los correos digitados ya está registrado, prueba utilizar uno nuevo.`,
      );
    }

    const newEmployee = this.employeeRepository.create({
      personalEmail,
      corporativeEmail,
      dni,
      ...employeeDetails,
    });

    await this.employeeRepository.save(newEmployee);
    return newEmployee;
  }

  async findAll() {
    const employees = await this.employeeRepository.find();

    if (employees.length <= 0) {
      return {
        status: 'succes',
        message: 'No hay empleados.',
      };
    }

    return employees;
  }

  async findOne(id: string) {
    let employee: Employee = await this.employeeRepository.findOneBy({
      id: id,
    });

    if (!employee)
      throw new NotFoundException(
        `El empleado con el ID ${id} no existe o no fue encontrado`,
      );

    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOneBy({ id: id });

    if (!employee) {
      throw new NotFoundException(
        `El empleado con el ID ${id} no fue encontrado.`,
      );
    }

    // Valida si ya existe un empleado con el mismo correo electrónico
    const existingEmployeeByEmail = await this.employeeRepository.findOne({
      where: {
        id: Not(id),
        personalEmail: updateEmployeeDto.personalEmail,
      },
    });

    if (existingEmployeeByEmail) {
      throw new BadRequestException(
        `Ya existe un empleado con este correo electrónico: ${updateEmployeeDto.personalEmail}`,
      );
    }

    // Valida si ya existe un empleado con el mismo DNI
    const existingEmployeeByDni = await this.employeeRepository.findOne({
      where: {
        id: Not(id),
        dni: updateEmployeeDto.dni,
      },
    });

    if (existingEmployeeByDni) {
      throw new BadRequestException(
        `Ya existe un empleado con este DNI: ${updateEmployeeDto.dni}`,
      );
    }

    const updatedEmployee = this.employeeRepository.merge(
      employee,
      updateEmployeeDto,
    );
    await this.employeeRepository.save(updatedEmployee);

    return updatedEmployee;
  }

  async remove(id: string) {
    const employee = await this.findOne(id);
    return this.employeeRepository.remove(employee);
  }
}
