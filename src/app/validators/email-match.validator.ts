import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const email = formGroup.get('emailAddress');
    const confirmEmail = formGroup.get('confirmEmailAddress');
    const secondEmail = formGroup.get('secondEmailAddress');

    if (!email || !confirmEmail) {
        return null;
    }
    if(secondEmail) {
        if(email.value === secondEmail.value) {
            secondEmail.setErrors({ repeatedEmailAddress: true });
        } else {
            secondEmail.setErrors(null);
        }
    }
    if (confirmEmail.value && email.value !== confirmEmail.value) {
        confirmEmail.setErrors({ emailAddressMismatch: true });
        return { emailAddressMismatch: true };
    } else {
        confirmEmail.setErrors(null);
        return null;
    }
};
