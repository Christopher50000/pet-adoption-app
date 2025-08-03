// in-memory-data.service.ts
import { InMemoryDbService } from 'angular-in-memory-web-api';

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
}
