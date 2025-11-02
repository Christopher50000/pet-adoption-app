import {AbstractControl,ValidationErrors,ValidatorFn} from '@angular/forms';


//custom validator function to validate if pets age in years and months is zero

export const ageNotZeroValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const years = control.get('years')?.value;
  const months = control.get('months')?.value;
  if(years === 0 && months === 0){
    return {ageNotZero: true};
  }

  return null; // meaning true
}
