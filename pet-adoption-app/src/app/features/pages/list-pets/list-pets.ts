import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet-service';
import { Spinner } from '../../../shared/loading/spinner/spinner';
import { FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common'; //importing the optimized image directive to improve performance
import { PetFilter } from './petFilter';



@Component({
  selector: 'app-list-pets',
  imports: [Spinner, FormsModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './list-pets.html',
  styleUrl: './list-pets.scss'
})
export class ListPets implements OnInit {
  pets: Pet[] = [];
  //loading spinner
  loading = true;
  // Validate and filter the search input
  validSearch = new FormControl('',Validators.pattern('^[a-zA-Z]*$'));
  private petFilter = new PetFilter();
  filteredPets: Pet[] = [];
  constructor(private petService: PetService) {
  }


  // this is called when the component is initialized and we call use the pet service to get the pets from the api
  ngOnInit() {
    this.petService.getPets().subscribe(pets => {
      this.pets = pets;
      this.filteredPets=[...pets];
      this.loading = false;
      console.log(this.pets);
    });

  }
  onSearch(){
    if(this.validSearch.status=="VALID"){
      console.log("Valid Search");
      this.filteredPets=this.petFilter.transform(this.pets,this.validSearch.value!);
      console.log(this.filteredPets);

    }
    else{
      console.log("Invalid Search");
      console.log(this.validSearch.status);
    }
  }
}
