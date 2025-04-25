import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {
    IsNotEmpty, Min,
} from 'class-validator';
import Project from './project.entity';
import Contact from './contact.entity';
import { ListingType, ListingStatus } from '../enums/apartment.enums';

@Entity()
export default class Apartment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsNotEmpty()
    title!: string;

    @Column()
    description?: string;

    @Column()
    @IsNotEmpty()
    city!: string;

    @Column()
    @IsNotEmpty()
    fullAddress!: string;

    @Column({
        type: "enum",
        enum: ListingType
    })
    @IsNotEmpty()
    listingType!: ListingType;

    @Column({
        type: "enum",
        enum: ListingStatus,
        default: ListingStatus.Active // Should be pending by default to be activated by admin
    })
    @IsNotEmpty()
    status!: ListingStatus;

    @Column("decimal", { precision: 12, scale: 2 })
    @Min(1)
    @IsNotEmpty()
    price!: number;

    @Column("int")
    @IsNotEmpty()
    areaInSqM!: number;

    @Column("int")
    @IsNotEmpty()
    bedrooms!: number;

    @Column("int")
    @IsNotEmpty()
    bathrooms!: number;

    @ManyToOne(() => Project,
        (project) => project.apartments, {
    })
    project!: Project;

    @ManyToOne(() => Contact,
        (contact) => contact.apartments, {
    })
    contact!: Contact;

    @Column()
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @Column()
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

    acceptListing() {
        this.status = ListingStatus.Active;
    }

    deleteListing() {
        this.status = ListingStatus.Deleted;
    }
}

