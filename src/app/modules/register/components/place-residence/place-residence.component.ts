import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../models/register.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-residence',
  templateUrl: './place-residence.component.html',
  styleUrl: './place-residence.component.scss'
})
export class PlaceResidenceComponent {

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
      countryResidence: [
        this.defaultValues.countryResidence,
        Validators.required
      ],
      province: [
        this.defaultValues.provinceResidence,
        Validators.required
      ],
      cityResidence: [
        this.defaultValues.cityResidence,
        Validators.required
      ],
      parishResidence: [
        this.defaultValues.parishResidence,
        Validators.required
      ],
      zone: [
        this.defaultValues.zone,
        Validators.required
      ],
      sector: [
        this.defaultValues.sector,
        Validators.required
      ],
      street: [
        this.defaultValues.sector,
        Validators.required
      ],
      secondaryStreet: [
        this.defaultValues.secondaryStreet,
        Validators.required
      ],
      number: [
        this.defaultValues.number,
        Validators.required
      ],
      geographicReference: [
        this.defaultValues.geographicReference,
        Validators.required
      ],
      postalCode: [
        this.defaultValues.postalCode,
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
