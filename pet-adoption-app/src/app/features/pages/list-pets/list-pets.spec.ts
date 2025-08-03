import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPets } from './list-pets';

describe('ListPets', () => {
  let component: ListPets;
  let fixture: ComponentFixture<ListPets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
