import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {PetService} from '../../services/pet-service';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-pet.html',
  styleUrl: './add-pet.scss'
})
export class AddPet  {
  constructor(private petService: PetService) {}
  petForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl<File |null>(null, Validators.required) //image can be File or null.
  });


  //The <input type="file"> element does not store the file in the form value automatically in a way you can send.Need to capture the File object:
  //Browsers won’t automatically expose file contents due to secruity reasons  to JavaScript just because you have a form control.
  //
  // You have to explicitly grab the file from event.target.files when the user selects it.
  onFileSelected(event: any) {
    const file: File = event.target.files[0]; //get the file from the event
    if (file) {
      this.petForm.patchValue({image: file }); // store the actual File object
      this.petForm.get('image')?.updateValueAndValidity();
    }
  }



  addPet(){
    // Files cannot go in JSON → we need FormData.
    //   Node cannot read files from JSON → we need Multer.
    if (this.petForm.invalid) return;

    console.log(this.petForm.value);
    //Add other fields as necessary
    const newPet: Pet = {
      name: this.petForm.value.name!,
    };

    const petFormData = new FormData();
    petFormData.append('pet', JSON.stringify(newPet));
    petFormData.append('image', this.petForm.value.image!);

    this.petService.addPet(petFormData).subscribe(()=>{
      console.log("Pet added successfully");
    });
  }


}
