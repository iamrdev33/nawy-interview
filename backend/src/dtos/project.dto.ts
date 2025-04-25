import { Expose } from "class-transformer";

export class ProjectDto {
    @Expose()
    id!: number;

    @Expose()
    name!: string;
}