import { plainToInstance } from "class-transformer";
import dataSource from "src/db/dataSource";
import GetApartmentsRequestDto from "src/dtos/getApartmentsRequest.dto";
import GetApartmentsResponseDto from "src/dtos/getApartmentsResponse.dto";
import GetSingleApartmentResponseDto from "src/dtos/getSingleApartmentResponse.dto";
import PostApartmentRequestDto from "src/dtos/postApartmentRequest.dto";
import { ListingStatus } from "src/enums/apartment.enums";
import Apartment from "src/models/apartment.entity";
import Contact from "src/models/contact.entity";
import Project from "src/models/project.entity";

export const getApartmentsList = async (query: GetApartmentsRequestDto) => {
    try {
        const {
            search,
            cities,
            listingType,
            bathrooms,
            bedrooms,
            minPrice,
            maxPrice,
            minAreaInSqM,
            maxAreaInSqM,
            createdBefore,
            createdAfter,
            page,
            pageSize
        } = query;

        const apartmentRepository = dataSource.appDataSource.getRepository(Apartment);
        const queryBuilder = apartmentRepository.createQueryBuilder('apartment');

        queryBuilder.leftJoinAndSelect('apartment.project', 'project');

        if (search) {
            if (!isNaN(Number(search))) {
                queryBuilder.andWhere("apartment.id = :id", { id: Number(search) });
            } else {
                queryBuilder.addSelect(
                    `(SELECT GREATEST(
                      MAX(similarity(word, :search)),
                      0
                    )
                    FROM unnest(string_to_array(apartment.title || ' ' || project.name, ' ')) AS word
                  )`,
                    'match_score'
                );

                queryBuilder.andWhere(
                    `EXISTS (
                    SELECT 1 FROM unnest(string_to_array(apartment.title || ' ' || project.name, ' ')) AS word
                    WHERE similarity(word, :search) > 0.3
                  )`,
                    { search }
                );

                queryBuilder.orderBy('match_score', 'DESC');
            }
        } else {
            queryBuilder.orderBy('apartment.createdAt', 'DESC');
        }

        queryBuilder.andWhere("apartment.status = :status", { status: ListingStatus.Active })

        const citiesArray = Array.isArray(cities) 
            ? cities.map(city => city.charAt(0).toUpperCase() + city.slice(1).toLowerCase())
            : cities 
            ? cities.split(',')
                .map((city: string) => city.trim())
                .map(city => city.charAt(0).toUpperCase() + city.slice(1).toLowerCase())
            : [];
        if (citiesArray && citiesArray.length > 0) {
            queryBuilder.andWhere("apartment.city IN (:...citiesArray)", { citiesArray });
        }

        if (listingType) queryBuilder.andWhere("apartment.listingType = :listingType", { listingType });
        if (bathrooms) queryBuilder.andWhere("apartment.bathrooms = :bathrooms", { bathrooms });
        if (bedrooms) queryBuilder.andWhere("apartment.bedrooms = :bedrooms", { bedrooms });
        if (minPrice || maxPrice) queryBuilder.andWhere("apartment.price BETWEEN :min AND :max", { min: minPrice ?? 0, max: maxPrice ?? Number.MAX_VALUE });
        if (minAreaInSqM) queryBuilder.andWhere("apartment.areaInSqM >= :minAreaInSqM", { minAreaInSqM });
        if (maxAreaInSqM) queryBuilder.andWhere("apartment.areaInSqM <= :maxAreaInSqM", { maxAreaInSqM });
        if (createdBefore) queryBuilder.andWhere("apartment.createdAt <= :createdBefore", { createdBefore });
        if (createdAfter) queryBuilder.andWhere("apartment.createdAt >= :createdAfter", { createdAfter });

        const [response, total] = await queryBuilder
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount();

        const apartments = plainToInstance(GetApartmentsResponseDto, response, {
            excludeExtraneousValues: true,
        });

        return { apartments, total, page, pageSize };
    } catch (error) {
        throw new Error(`Failed to parse query parameters: ${error}`);
    }
}

export const getApartmentDetails = async (apartmentId: number) => {
    try {

        const apartmentRepository = dataSource.appDataSource.getRepository(Apartment);
        const queryBuilder = apartmentRepository.createQueryBuilder('apartment');
        queryBuilder.leftJoinAndSelect('apartment.project', 'project');
        queryBuilder.leftJoinAndSelect('apartment.contact', 'contact');

        queryBuilder.where("apartment.id = :id", { id: apartmentId });
        queryBuilder.andWhere("apartment.status = :status", { status: ListingStatus.Active })

        const response = await queryBuilder.getOneOrFail();

        const apartment = plainToInstance(GetSingleApartmentResponseDto, response, {
            excludeExtraneousValues: true,
        });

        return apartment;
    } catch (error) {
        throw new Error(`Failed to parse query parameters: ${error}`);
    }
}

export const addApartment = async (apartmentData: PostApartmentRequestDto) => {
    try {
        const apartmentRepository = dataSource.appDataSource.getRepository(Apartment);
        const projectRepository = dataSource.appDataSource.getRepository(Project);
        const contactRepository = dataSource.appDataSource.getRepository(Contact);

        const project = await projectRepository.findOneBy({ id: apartmentData.projectId });
        if (!project) {
            throw new Error(`Project with ID ${apartmentData.projectId} not found`);
        }

        const contact = await contactRepository.findOneBy({ id: apartmentData.contactId });
        if (!contact) {
            throw new Error(`Contact with ID ${apartmentData.contactId} not found`);
        }

        const newApartment = apartmentRepository.create({
            ...apartmentData,
            project: project,
            contact: contact
        });

        const savedApartment = await apartmentRepository.save(newApartment);

        const apartment = plainToInstance(GetSingleApartmentResponseDto, savedApartment, {
            excludeExtraneousValues: true,
        });

        return apartment;
    } catch (error) {
        throw new Error(`Failed to add apartment: ${error}`);
    }
}
