import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../models/register.model';
import { Subscription } from 'rxjs';
import { CONSTANTS } from 'src/app/common/const';
import { passwordMatchValidator } from 'src/app/validators/password-mismatch.validator';

@Component({
  selector: 'app-password-security',
  templateUrl: './password-security.component.html',
  styleUrl: './password-security.component.scss'
})
export class PasswordSecurityComponent implements OnInit {

  @Input('updateParentModel') updateParentModel: (
      part: Partial<IRegister>,
      isFormValid: boolean
  ) => void;
  form: FormGroup;
  @Input() defaultValues: Partial<IRegister>;
  private unsubscribe: Subscription[] = [];
  showPassword = {
    password: false,
    confirmPassword: false,
  };
  protected readonly labels = CONSTANTS.register.passwordSecurity;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, false);
  }

  togglePassword(key: 'password' | 'confirmPassword'): void {
    this.showPassword[key] = !this.showPassword[key];
  }

  initForm(): void {
    this.form = this.fb.group({
        password: [
          this.defaultValues.password, 
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            // eslint-disable-next-line no-useless-escape
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%]).+$/)
          ]
        ],
        confirmPassword: [
          this.defaultValues.confirmPassword, 
          [
            Validators.required,
          ],
        ],
        securityQuestionOne: [
          this.defaultValues.securityQuestionOne, 
          [
            Validators.required,
          ],
        ],
        securityAnswerOne: [
          this.defaultValues.securityAnswerOne, 
          [
            Validators.required,
            Validators.maxLength(20),
          ]
        ],
        securityQuestionTwo: [
          this.defaultValues.securityQuestionTwo, 
          [
            Validators.required,
          ],
        ],
        securityAnswerTwo: [
          this.defaultValues.securityAnswerTwo, 
          [
            Validators.required,
            Validators.maxLength(20),
          ],
        ],
        securityQuestionThree: [
          this.defaultValues.securityQuestionThree, 
          [
            Validators.required,
          ],
        ],
        securityAnswerThree: [
          this.defaultValues.securityAnswerThree, 
          [
            Validators.required,
            Validators.maxLength(20),
          ],
        ],
      },
      { validators: passwordMatchValidator }
    );
    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, this.form.valid);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  /*passwordSecurityForm: FormGroup;
  @Output() complete = new EventEmitter<void>();

  completeStep() {
    if (this.passwordSecurityForm.valid) {
      this.complete.emit();
    }
  }*/
}
