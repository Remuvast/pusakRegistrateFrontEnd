import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const cellPhoneMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const cellPhone = formGroup.get('cellPhone');
    const secondCellPhone = formGroup.get('secondCellPhone');

    if (!cellPhone || !secondCellPhone) {
        return null;
    }
    const currentErrors = secondCellPhone.errors || {};
    if (secondCellPhone.value && cellPhone.value === secondCellPhone.value) {
        secondCellPhone.setErrors({ ...currentErrors, cellPhoneMatch: true });
        return { cellPhoneMatch: true };
    } else {
        if (currentErrors.emailAddressMismatch) {
            delete currentErrors.emailAddressMismatch;
        }
        secondCellPhone.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
        return null;
    }
};
