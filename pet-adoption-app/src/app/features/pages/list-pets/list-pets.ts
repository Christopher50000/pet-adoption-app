import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet.model'
import { PetService } from '../../services/pet-service'

@Component({
  selector: 'app-list-pets',
  imports: [],
  templateUrl: './list-pets.html',
  styleUrl: './list-pets.scss'
})
export class ListPets implements OnInit {
  pets: Pet[]=[];

  constructor(private petService: PetService) {}

  // this is called when the component is initialized and we call use the pet service to get the pets from the api
  ngOnInit() {
    this.petService.getPets().subscribe(pets => {
      this.pets = pets;
    });
  }

}
