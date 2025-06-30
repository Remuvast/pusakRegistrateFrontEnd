import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CI } from '../common/const';

export function fullNameValidator(fullname: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const name = normalize(group.parent?.get('name')?.value?.trim() ?? '');
    const lastname = normalize(group.parent?.get('lastName')?.value?.trim() ?? '');
    //const fullname = group.parent?.get('fullName')?.value?.trim() ?? '';
    const identificationType = group.parent?.get('identificationType')?.value?.trim() ?? '';
    if(identificationType !== CI) {
        return null;
    }
    const combinated = `${lastname} ${name}`.trim();
    return combinated === fullname
      ? null
      : { invalidFullname: true };
  };
}

export function normalize(texto: string): string {
  return texto?.replace(/\s+/g, ' ').trim();
}
