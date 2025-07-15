import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchFields(field: string, confirmField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(field);
    const confirmControl = formGroup.get(confirmField);

    if (!control || !confirmControl) return null;

    const areEquals = control.value === confirmControl.value;

    if (!areEquals) {
      confirmControl.setErrors({ notMatch: true });
    } else {
      const errors = confirmControl.errors;
      if (errors) {
        delete errors['notMatch'];
        if (Object.keys(errors).length === 0) {
          confirmControl.setErrors(null);
        } else {
          confirmControl.setErrors(errors);
        }
      }
    }

    return null;
  };
}