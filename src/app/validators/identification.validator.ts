import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import {CI, REGEX_IDENTIFICATION} from "../common/const";

export function identificationValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.parent) return null;
        const value = control.value;
        const documentType = control.parent.get('identificationType')?.value;
        if (value && documentType === CI && !validateEcuadorianIdentification(value)) {
            return { invalidIdentification: true };
        } else if (value && !REGEX_IDENTIFICATION.test(value)) {
            return { invalidDocument: true };
        }
        return null;
    }
}

export function validateEcuadorianIdentification(identification: string) {
    let counter = 0;
    let accumulator = 0;
    let instance = 0;
    try {
      if (identification != null && identification != '' && identification.length === 10) {
        for (counter = 1; counter <= 9; counter++) {
          if (counter % 2 != 0) {
            instance = parseInt(identification.substring(counter - 1, counter)) * 2;
            if (instance > 9) instance -= 9;
          }
          else instance = parseInt(identification.substring(counter - 1, counter));
          accumulator += instance;
        }
        while (accumulator > 0)
          accumulator -= 10;
        return parseInt(identification.substring(9, 10)) == (accumulator * -1);
      } else
        return;
    } catch (e) {
      console.error(e);
      return false;
    }
}
