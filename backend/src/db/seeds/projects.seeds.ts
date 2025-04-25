import { AppDataSource } from '../dataSourceConfig';
import Project from 'src/models/project.entity';

const projectsList = [
  {name: 'Mivida'},
  {name: 'Palm Hills'},
  {name: 'AlAhly Sabbour'},
  {name: 'NewGiza'},
  {name: 'Mountain View'},
  {name: 'Sodic'},
  {name: 'Talaat Moustafa'},
  {name: 'Hassan Allam'},
  {name: 'City Edge'},
  {name: 'Misr Italia'},
  {name: 'Orascom'},
  {name: 'Emaar'},
  {name: 'Jumeirah'},
  {name: 'Zed'},
  {name: 'ElGouna'},
];

export async function seedProjects() {
  const repo = AppDataSource.getRepository(Project);

  const existing = await repo.find();
  if (existing.length > 0) {
    console.warn('Projects already seeded');
    return;
  }

  const projects = projectsList.map((p) => {
    const project = new Project();
    project.name = p.name;
    return project;
  });

  await repo.save(projects);
  console.log('Projects seeded!');
}
