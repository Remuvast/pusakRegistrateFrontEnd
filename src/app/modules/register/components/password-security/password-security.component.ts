import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../models/register.model';
import { Subscription } from 'rxjs';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, false);
  }

  initForm(): void {
    this.form = this.fb.group({
      password: [
        '', 
        Validators.required
      ],
      confirmPassword: [
        '', 
        Validators.required
      ],
      securityQuestionOne: [
        '', 
        Validators.required
      ],
      securityAnswerOne: [
        '', 
        Validators.required
      ],
      securityQuestionTwo: [
        '', 
        Validators.required
      ],
      securityAnswerTwo: [
        '', 
        Validators.required
      ],
      securityQuestionThree: [
        '', 
        Validators.required
      ],
      securityAnswerThree: [
        '', 
        Validators.required
      ],
    });
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
