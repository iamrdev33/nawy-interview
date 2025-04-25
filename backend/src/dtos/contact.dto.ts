import { Expose } from "class-transformer";

export class ContactDto {
    @Expose()
    id!: number;

    @Expose()
    name!: string;

    @Expose()
    mail!: string;

    @Expose()
    phone!: string;
}