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
      country: [
        '',
        Validators.required
      ],
      province: [
        '',
        Validators.required
      ],
      city: [
        '',
        Validators.required
      ],
      parish: [
        '',
        Validators.required
      ],
      zone: [
        '',
        Validators.required
      ],
      sector: [
        '',
        Validators.required
      ],
      street: [
        '',
        Validators.required
      ],
      secondaryStreet: [
        '',
        Validators.required
      ],
      number: [
        '',
        Validators.required
      ],
      geographicReference: [
        '',
        Validators.required
      ],
      postalCode: [
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
