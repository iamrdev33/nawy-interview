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
  IsNotEmpty,
} from 'class-validator';
import Apartment from './apartment.entity';

@Entity()
export default class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  name!: string;

  @OneToMany(() => Apartment,
    (apartment) => apartment.project, {
  })
  apartments!: Apartment;

  @Column()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Column()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}

