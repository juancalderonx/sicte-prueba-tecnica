import { Module } from '@nestjs/common';
import { EnvConfiguration } from './config/env.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // El + es porque debe ser un número.
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    EmployeesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_PORT);
    console.log(process.env.DB_NAME);
    console.log(process.env.DB_USERNAME);
    console.log(process.env.DB_PASSWORD);
  }
}
