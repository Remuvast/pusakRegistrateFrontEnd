import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (!password || !confirmPassword) {
        return null;
    }
    const currentErrors = confirmPassword.errors || {};
    if (confirmPassword.value && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ ...currentErrors, passwordMismatch: true });
        return { passwordMismatch: true };
    } else {
        if(currentErrors.passwordMismatch) {
            delete currentErrors.passwordMismatch;
        }
        confirmPassword.setErrors(Object.keys(currentErrors).length > 0 ? currentErrors : null);
        return null;
    }
};
