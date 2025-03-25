import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../models/register.model';
import { Subscription } from 'rxjs';
import { identificationValidation } from 'src/app/validators/identification.validator';
import { maxDateValidator } from 'src/app/validators/birthdate.validator';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent implements OnInit {

  /*personalInformationForm: FormGroup;
  @Output() complete = new EventEmitter<void>();*/
  @Input('updateParentModel') updateParentModel: (
    part: Partial<IRegister>,
    isFormValid: boolean
  ) => void;
  form: FormGroup;
  @Input() defaultValues: Partial<IRegister>;
  private unsubscribe: Subscription[] = [];

  get f() {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, false);
    this.form?.get('disability')?.valueChanges.subscribe(value => {
      this.updateValidations(value);
    });
    this.form?.get('identificationType')?.valueChanges.subscribe(value => {
      this.form.reset({
        identificationType: value,
        identification: '',
        lastName: '',
        name: '', 
        birthdate: '',
        gender: '',
        maritalStatus: '',
        ethnicity: '',
        disability: false,
        disabilityType: '',
        disabilityPercent: '',
        nacionality: '',
        emailAddress: '',
        confirmEmailAddress: '',
        secondEmailAddress: '',
        phoneNumber: '',
        cellPhone: '',
        secondCellPhone: '',
      });
    });
  }

  updateValidations(value: boolean): void {
    const disabilityType = this.form.get('disabilityType');
    const disabilityPercent = this.form.get('disabilityPercent');
    if (value) {
      disabilityType?.setValidators([Validators.required]);
      disabilityPercent?.setValidators([Validators.required]);
    } else {
      disabilityType?.clearValidators();
      disabilityPercent?.clearValidators();
      disabilityType?.setValue('');
      disabilityPercent?.setValue('');
    }
    disabilityType?.updateValueAndValidity();
    disabilityPercent?.updateValueAndValidity();
  }

  initForm(): void {
    this.form = this.fb.group({
      identificationType: [
        '', 
        [Validators.required]
      ],
      identification: [
        '', 
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          identificationValidation(),
        ]
      ],
      lastName: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100),
        ]
      ],
      name: [
        '', 
        [
          Validators.required,
          Validators.maxLength(100),
        ]
      ],
      birthdate: [
        '', 
        [
          Validators.required,
          maxDateValidator(),
        ]
      ],
      gender: [
        '', 
        [Validators.required]
      ],
      maritalStatus: [
        '', 
        [Validators.required]
      ],
      ethnicity: [
        '', 
        [Validators.required]
      ],
      disability: [
        false,
      ],
      disabilityType: [
        ''
      ],
      disabilityPercent: [
        ''
      ],
      nacionality: [
        '', 
        [Validators.required]
      ],
      emailAddress: [
        '', 
        [Validators.required]
      ],
      confirmEmailAddress: [
        '', 
        [Validators.required]
      ],
      secondEmailAddress: [
        '',
      ],
      phoneNumber: [
        '', 
        [Validators.required]
      ],
      cellPhone: [
        '', 
        [Validators.required]
      ],
      secondCellPhone: [
        '',
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
}
