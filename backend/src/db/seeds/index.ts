import { AppDataSource } from "../dataSourceConfig";
import { seedProjects } from "./projects.seeds";
import { seedApartments } from "./apartments.seeds";
import { seedContacts } from "./contacts.seeds";

async function seedAll() {
    await AppDataSource.initialize();

    await seedProjects();
    await seedContacts(40);
    await seedApartments(300);

    await AppDataSource.destroy();
}

seedAll()
    .then(() => console.log('Seeding done!'))
    .catch((err) => console.error('Seeding error:', err));
