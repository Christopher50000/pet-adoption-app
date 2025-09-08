import {Pipe, PipeTransform}  from '@angular/core';
import {Pet} from '../../models/pet.model';

@Pipe({
  name: 'petFilter',
  pure: false // this makes the pipe impure, which means it will be called every time the input changes
})

export class PetFilter implements PipeTransform {
  transform(Pets: Pet[], search: string): Pet[] {
    if (!search) {
      return Pets;
    }
    return Pets.filter(pet => pet.name.toLowerCase().startsWith(search.toLowerCase()));
  }
}
