import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {PetService} from '../../services/pet-service';
import { Pet } from '../../models/pet.model';
import { OnInit } from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-pet.html',
  styleUrl: './add-pet.scss'
})
export class AddPet implements OnInit  {
  constructor(private petService: PetService) {}
  petForm!: FormGroup;


  ngOnInit() {
    this.petForm = new FormGroup({
      name: new FormControl('', Validators.pattern('^[a-zA-Z]*$')),
      image: new FormControl<File | null>(null, Validators.required), //image can be File or null.
      description: new FormControl('', Validators.required),
      years: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(30)]),
      months: new FormControl<number | null>(null, [Validators.min(0), Validators.max(11)])
  });
  }

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
      yearsOfAge: this.petForm.value.years!,
      monthsOfAge: this.petForm.value.months!,
      description: this.petForm.value.description!,
    };

    const petFormData = new FormData();
    petFormData.append('pet', JSON.stringify(newPet));
    petFormData.append('image', this.petForm.value.image!);

    console.log("Submitting Form: to add pet "+this.petForm.value.name);
    this.petService.addPet(petFormData).subscribe(()=>{
      console.log("Pet added successfully");
    });
  }

}
