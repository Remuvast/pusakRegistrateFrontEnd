import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const email = formGroup.get('emailAddress');
    const confirmEmail = formGroup.get('confirmEmailAddress');
    const secondEmail = formGroup.get('secondEmailAddress');

    if (!email || !confirmEmail) {
        return null;
    }
    const currentErrors = secondEmail?.errors || {};
    if(secondEmail) {
        if(email.value === secondEmail.value) {
            secondEmail.setErrors({ ...currentErrors, repeatedEmailAddress: true });
        } else {
            if (currentErrors.emailAddressMismatch) {
                delete currentErrors.emailAddressMismatch;
            }
            secondEmail.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
        }
    }
    const currentErrors2 = confirmEmail?.errors || {};
    if (confirmEmail.value && email.value !== confirmEmail.value) {
        confirmEmail.setErrors({ ...currentErrors2, emailAddressMismatch: true });
        return { emailAddressMismatch: true };
    } else {
        if (currentErrors.emailAddressMismatch) {
            delete currentErrors.emailAddressMismatch;
        }
        confirmEmail.setErrors(Object.keys(currentErrors).length ? currentErrors2 : null);
        return null;
    }
};
