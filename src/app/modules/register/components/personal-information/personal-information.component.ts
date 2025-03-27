import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../models/register.model';
import { Subscription } from 'rxjs';
import { identificationValidation } from 'src/app/validators/identification.validator';
import { maxDateValidator } from 'src/app/validators/birthdate.validator';
import { emailMatchValidator } from 'src/app/validators/email-match.validator';
import { cellPhoneMatchValidator } from 'src/app/validators/cellphone-match.validator';
import { CONSTANTS } from 'src/app/common/const';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent implements OnInit {

  @Input('updateParentModel') updateParentModel: (
    part: Partial<IRegister>,
    isFormValid: boolean
  ) => void;
  form: FormGroup;
  @Input() defaultValues: Partial<IRegister>;
  private unsubscribe: Subscription[] = [];
  protected readonly labels = CONSTANTS.register.personalInformation;

  get f() {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, !!this.form?.get('identificationType')?.value);
    this.form?.get('disability')?.valueChanges.subscribe(value => {
      this.updateValidations(value);
    });
  }

  clearForm(value: string): void {
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
      disabilityPercent: null,
      nacionality: '',
      emailAddress: '',
      confirmEmailAddress: '',
      secondEmailAddress: '',
      phoneNumber: '',
      cellPhone: '',
      secondCellPhone: '',
    });
  }

  updateValidations(disability: boolean): void {
    const disabilityType = this.form.get('disabilityType');
    const disabilityPercent = this.form.get('disabilityPercent');
    if (disability) {
      disabilityType?.setValidators([Validators.required]);
      disabilityPercent?.setValidators(
        [
          Validators.required, 
          Validators.min(1),
          Validators.max(100),
          Validators.pattern(/^\d+$/),
        ]);
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
    this.form = this.fb.group(
      {
        identificationType: [
          this.defaultValues.identificationType, 
          [Validators.required]
        ],
        identification: [
          this.defaultValues.identification, 
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            identificationValidation(),
          ]
        ],
        lastName: [
          this.defaultValues.lastName, 
          [
            Validators.required,
            Validators.maxLength(100),
          ]
        ],
        name: [
          this.defaultValues.name, 
          [
            Validators.required,
            Validators.maxLength(100),
          ]
        ],
        birthdate: [
          this.defaultValues.birthdate, 
          [
            Validators.required,
            maxDateValidator(),
          ]
        ],
        gender: [
          this.defaultValues.gender, 
          [Validators.required]
        ],
        maritalStatus: [
          this.defaultValues.maritalStatus, 
          [Validators.required]
        ],
        ethnicity: [
          this.defaultValues.ethnicity, 
          [Validators.required]
        ],
        disability: [
          this.defaultValues.disability,
        ],
        disabilityType: [
          this.defaultValues.disabilityType
        ],
        disabilityPercent: [
          this.defaultValues.disabilityPercent
        ],
        nacionality: [
          this.defaultValues.nacionality, 
          [Validators.required]
        ],
        emailAddress: [
          this.defaultValues.emailAddress, 
          [
            Validators.required,
            // eslint-disable-next-line no-useless-escape
            Validators.pattern(/^[a-zA-Z0-9](\.?[_.\-]*[a-zA-Z0-9]+)*@\w+([\.\-]\w+)*(\.[a-zA-Z]{2,})$/),
            Validators.maxLength(100),
          ]
        ],
        confirmEmailAddress: [
          this.defaultValues.confirmEmailAddress, 
          [
            Validators.required,
          ]
        ],
        secondEmailAddress: [
          this.defaultValues.secondEmailAddress,
          [
            Validators.email,
            // eslint-disable-next-line no-useless-escape
            Validators.pattern(/^[a-zA-Z0-9](\.?[_.\-]*[a-zA-Z0-9]+)*@\w+([\.\-]\w+)*(\.[a-zA-Z]{2,})$/),
            Validators.maxLength(100),
          ]
        ],
        phoneNumber: [
          this.defaultValues.phoneNumber, 
          [
            Validators.required,
            Validators.pattern(/^\d+$/),
            Validators.minLength(7),
            Validators.maxLength(9),
          ]
        ],
        cellPhone: [
          this.defaultValues.cellPhone, 
          [
            Validators.required,
            Validators.pattern(/^\d+$/),
            Validators.minLength(10),
            Validators.maxLength(10),
          ]
        ],
        secondCellPhone: [
          this.defaultValues.secondCellPhone,
          [
            Validators.pattern(/^\d+$/),
            Validators.minLength(10),
            Validators.maxLength(10),
          ]
        ],
      },
      { validators: [emailMatchValidator, cellPhoneMatchValidator] }
    );
    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, this.form.valid);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
