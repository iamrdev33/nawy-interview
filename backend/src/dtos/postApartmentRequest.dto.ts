import { ListingType } from "src/enums/apartment.enums";
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export default class PostApartmentRequestDto {

    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsNumberString()
    city!: string;

    @IsNotEmpty()
    @IsEnum(ListingType)
    listingType!: ListingType;

    @IsNotEmpty()
    @IsNumberString()
    price!: number;

    @IsNotEmpty()
    @IsNumberString()
    areaInSqM!: number;

    @IsNotEmpty()
    @IsNumberString()
    bedrooms!: number;

    @IsNotEmpty()
    @IsNumberString()
    bathrooms!: number;

    @IsNotEmpty()
    @IsNumberString()
    projectId!: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsString()
    fullAddress!: string;
   
    @IsNotEmpty()
    @IsNumberString()
    contactId!: number;

}
