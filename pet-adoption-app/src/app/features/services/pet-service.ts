import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private petsUrl = '/api/pets'

  constructor(private http: HttpClient) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.petsUrl);//this is the url that the http client will use to get the data using the in memory db
  }

  addPet(formData: FormData): Observable<Pet> {
    console.log("Submitting Form: ")
    return this.http.post<Pet>(this.petsUrl, formData);
  }

}
