import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import Apartment from './apartment.entity';

@Entity()
export default class Contact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  name!: string;

  @OneToMany(() => Apartment,
    (apartment) => apartment.contact, {
  })
  apartments!: Apartment;

  @Column()
  @IsNotEmpty()
  @Matches(/^01[0-9]{9}$/, { message: 'Contact must be a valid phone number starting with 01 and consisting of 11 digits' })
  phone!: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  mail!: string;

  @Column()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Column()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}

