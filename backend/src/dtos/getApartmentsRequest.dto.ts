import { Transform } from 'class-transformer';
import {
    IsArray,
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';
import { ListingType } from 'src/enums/apartment.enums';

export default class GetApartmentsRequestDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString({ each: true })
    @Transform(({ value }) => value.split(',').map((city: string) => city.trim()))
    @IsArray()
    cities?: string;

    @IsOptional()
    @IsEnum(ListingType)
    listingType?: ListingType;

    @IsOptional()
    minPrice?: number;

    @IsOptional()
    maxPrice?: number;

    @IsOptional()
    minAreaInSqM?: number;

    @IsOptional()
    maxAreaInSqM?: number;

    @IsOptional()
    bedrooms?: number;

    @IsOptional()
    bathrooms?: number;

    @IsOptional()
    createdBefore?: number;
    
    @IsOptional()
    createdAfter?: number;
    
    @IsOptional()
    projectId?: number;

    page: number = 1;

    pageSize: number = 10;
}