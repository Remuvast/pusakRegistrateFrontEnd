import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Función de validador personalizado
export function maxDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const date = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    console.log('oaaaaaa', date > today)
    return date > today ? { invalidDate: true } : null;
  };
}