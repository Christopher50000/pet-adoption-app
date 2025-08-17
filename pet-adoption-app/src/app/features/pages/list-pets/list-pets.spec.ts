import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPets } from './list-pets';
import { PetService} from '../../services/pet-service';
import {provideHttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Pet} from '../../models/pet.model';

describe('ListPets', () => {
  let component: ListPets;
  let petServiceSpy: jasmine.SpyObj<PetService>;

  beforeEach(async () => {
     petServiceSpy = jasmine.createSpyObj('PetService', ['getPets']);

    TestBed.configureTestingModule({
      providers: [
        ListPets,
        { provide: PetService, useValue: petServiceSpy },
        provideHttpClient() // <-- THIS PROVIDES HttpClient FOR TEST
      ]
    });

    petServiceSpy = TestBed.inject(PetService) as jasmine.SpyObj<PetService>
    component = TestBed.inject(ListPets);

  });

  it('should load pets', () => {
    // Arrange: mock data
    const mockPets: Pet[] = [{ id: 1, name: 'Fido' }];
    petServiceSpy.getPets.and.returnValue(of(mockPets));

    // Act: initialize component (calls ngOnInit)
    component.ngOnInit();

    // Assert
    expect(component.pets).toEqual(mockPets);
    expect(component.loading).toBe(false);
    expect(petServiceSpy.getPets).toHaveBeenCalled();
    expect(petServiceSpy.getPets).toHaveBeenCalledTimes(1);


  });
});
