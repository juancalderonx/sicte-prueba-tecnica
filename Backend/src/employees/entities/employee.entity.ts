import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'employees' })
export class Employee {
  // Columns

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  fullname: string;

  @Column('text', { unique: true })
  dni: string;

  @Column('text')
  workspace: string;

  @Column('text')
  role: string;

  @Column('float', {
    default: 0,
  })
  salary: number;

  @Column('text')
  lineManager: string;

  @Column('text')
  phone: string;

  @Column('text', {
    unique: true,
  })
  personalEmail: string;

  @Column('text', {
    unique: true,
  })
  corporativeEmail: string;

  @BeforeInsert()
  checkData() {
    this.personalEmail = this.personalEmail.toLowerCase().trim();
    this.corporativeEmail = this.corporativeEmail.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkDataUpdate() {
    this.checkData();
  }
}
