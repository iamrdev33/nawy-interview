import { faker } from '@faker-js/faker';
import { ListingType, ListingStatus } from 'src/enums/apartment.enums';
import Apartment from 'src/models/apartment.entity';
import Project from 'src/models/project.entity';
import Contact from 'src/models/contact.entity';
import { AppDataSource } from '../dataSourceConfig';

export async function seedApartments(count = 10) {
  const apartmentRepo = AppDataSource.getRepository(Apartment);
  const contactRepo = AppDataSource.getRepository(Contact);
  const projectRepo = AppDataSource.getRepository(Project);

  const contacts = await contactRepo.find();
  const projects = await projectRepo.find();

  const cities = ['Maadi',
    'ElShekh Zayed',
    'Haram',
    'Sheraton',
    'Heliopolis',
    'Mohandeseen',
    'Nasr City',
    'New Cairo',
    'October City',
    'Zamalek',
    'Dokki',
    'Garden City'
  ];

  for (let i = 0; i < count; i++) {
    const apartment = new Apartment();
    apartment.description = faker.lorem.paragraph();
    apartment.city = faker.helpers.arrayElement(cities);
    apartment.fullAddress = faker.location.streetAddress();
    apartment.price = faker.number.int({ min: 50000, max: 1000000 });
    apartment.areaInSqM = faker.number.int({ min: 40, max: 250 });
    apartment.bedrooms = faker.number.int({ min: 1, max: 5 });
    apartment.bathrooms = faker.number.int({ min: 1, max: 3 });
    apartment.title = `${faker.helpers.arrayElement([
      'Cozy',
      'Modern',
      'Spacious',
      'Luxury',
      'Affordable',
      'Elegant',
      'Charming',
      'Newly Renovated',
    ])} ${apartment.bedrooms}-Bedroom Apartment in ${apartment.city}`;
    apartment.listingType = faker.helpers.arrayElement([
      ListingType.Sale,
      ListingType.Rent,
    ]);
    apartment.status = ListingStatus.Active;
    apartment.createdAt = faker.date.past({ years: 1 });

    apartment.updatedAt = new Date();

    apartment.contact = faker.helpers.arrayElement(contacts);

    apartment.project = faker.helpers.arrayElement(projects);

    await apartmentRepo.save(apartment);
  }

  console.log(`${count} Apartments seeded!`);
}
