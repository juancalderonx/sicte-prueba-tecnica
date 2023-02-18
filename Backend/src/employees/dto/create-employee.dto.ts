import {
  IsDecimal,
  IsEmail,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  @IsNotEmpty()
  readonly fullname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  readonly dni: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  readonly workspace: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(120)
  readonly role: string;

  @IsPositive()
  @IsDecimal()
  @IsNotEmpty()
  readonly salary: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  readonly lineManager: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  readonly phone: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly personalEmail: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly corporativeEmail: string;
}
