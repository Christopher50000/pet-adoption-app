// in-memory-data.service.ts
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Pet } from '../../features/models/pet.model';
export class InMemoryDataService implements InMemoryDbService {
  //Creates a pet in memory database and uses the url: api/pets
  createDb() {
    const pets = [
      { id: 1, name: 'Bandit' },
      { id: 2, name: 'Thomas' },
      { id: 3, name: 'Pumpkin' },
      { id: 4, name: 'Basil' },
      { id: 5, name: 'Lily' }
    ];
    return { pets };
  }

  // Generates the next available ID when adding a new pet
  genId(pets: Pet[]): number {
    return pets.length > 0 ? Math.max(...pets.map(pet => pet.id)) + 1 : 1;
  }
}
