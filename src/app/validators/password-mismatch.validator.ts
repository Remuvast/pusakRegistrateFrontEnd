import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (!password || !confirmPassword) {
        return null;
    }
    if (confirmPassword.value && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
    } else {
        confirmPassword.setErrors(null);
        return null;
    }
};
