import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { matchFields } from './match-fields.validator';
import { distinctQuestionsValidator } from './distinct-questions.validator';

export const combinatedValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  const questions = distinctQuestionsValidator('securityQuestionOne', 'securityQuestionTwo', 'securityQuestionThree')(formGroup);
  const password = matchFields('password', 'confirmPassword')(formGroup);

  return { ...(questions || {}), ...(password || {}) };
};
