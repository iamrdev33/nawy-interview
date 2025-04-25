import { ContactDto } from './contact.dto';
import GetApartmentsResponseDto from './getApartmentsResponse.dto';
import { Expose, Type } from 'class-transformer';

export default class GetSingleApartmentResponseDto
    extends GetApartmentsResponseDto {

    @Expose()
    description?: string;

    @Expose()
    @Type(() => ContactDto)
    contact?: ContactDto;
}