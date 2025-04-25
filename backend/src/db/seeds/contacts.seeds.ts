import Contact from "src/models/contact.entity";
import { AppDataSource } from "../dataSourceConfig";
import { faker } from "@faker-js/faker";

export const seedContacts = async (count: number = 50) => {
  const contactRepo = AppDataSource.getRepository(Contact);

  const contacts: Contact[] = [];

  for (let i = 0; i < count; i++) {
    const contact = contactRepo.create({
      name: faker.person.fullName(),
      mail: faker.internet.email(),
      phone: '01' + faker.string.numeric(9),
    });

    contacts.push(contact);
  }

  await contactRepo.save(contacts);
  console.log(`✅ Seeded ${contacts.length} contacts`);
};
