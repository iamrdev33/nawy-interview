import { Expose, Type } from "class-transformer";
import { ListingType } from "src/enums/apartment.enums";
import { ProjectDto } from "./project.dto";

export default class GetApartmentsResponseDto {
    
    @Expose()
    id!: number;
    
    @Expose()
    title!: string;

    @Expose()
    city!: string;

    @Expose()
    listingType!: ListingType;

    @Expose()
    price!: number;

    @Expose()
    areaInSqM!: number;

    @Expose()
    bedrooms!: number;

    @Expose()
    bathrooms!: number;

    @Expose()
    createdAt!: Date;
    
    @Expose()
    @Type(() => ProjectDto)
    project?: ProjectDto;
}
