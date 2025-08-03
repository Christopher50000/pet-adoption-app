import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { AddPet } from './features/pages/add-pet/add-pet';
import {ListPets} from './features/pages/list-pets/list-pets';

export const routes: Routes = [
  {path: 'Home-Page',component: Home},
  {path: 'Add-Pet',component: AddPet},
  {path: 'List-Pets',component: ListPets}
];
