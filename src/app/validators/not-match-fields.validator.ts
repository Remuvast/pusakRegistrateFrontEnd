import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const notMatchFields = (orginalField: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent || !control.value) return null;
    const originalValue = control.parent.get(orginalField)?.value;
    return control.value !== originalValue ? null : { match: true };
  };
};
