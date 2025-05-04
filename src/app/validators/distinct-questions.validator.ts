import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export const distinctQuestionsValidator = (
  question1: string,
  question2: string,
  question3: string
): ValidatorFn => {
  return (group: AbstractControl): ValidationErrors | null => {
    if (!(group instanceof FormGroup)) return null;

    const control1 = group.get(question1);
    const control2 = group.get(question2);
    const control3 = group.get(question3);

    if (!control1 || !control2 || !control3) return null;

    const v1 = control1.value;
    const v2 = control2.value;
    const v3 = control3.value;

    const allHaveValue = v1 && v2 && v3;

    // Limpia el error de "notDistinct" sin tocar otros
    [control1, control2, control3].forEach(control => {
      if (control.errors) {
        const { notDistinct, ...otherErrors } = control.errors;
        control.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
      }
    });

    if (!allHaveValue) {
      return null; // No validamos si hay campos vacíos
    }

    const duplicates: Set<string> = new Set();
    const seen = new Map<string, string>(); // valor -> campo

    [[v1, question1], [v2, question2], [v3, question3]].forEach(([val, field]) => {
      if (seen.has(val)) {
        duplicates.add(field);
        duplicates.add(seen.get(val)!);
      } else {
        seen.set(val, field);
      }
    });

    duplicates.forEach(field => {
      const control = group.get(field);
      if (control) {
        const errors = control.errors || {};
        control.setErrors({ ...errors, notDistinct: true });
      }
    });

    return duplicates.size ? { fieldsNotDistinct: true } : null;
  };
};
