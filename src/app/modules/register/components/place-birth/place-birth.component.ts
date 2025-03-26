import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../models/register.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-birth',
  templateUrl: './place-birth.component.html',
  styleUrl: './place-birth.component.scss'
})
export class PlaceBirthComponent {

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
      countryBirth: [
        this.defaultValues.countryBirth, 
        Validators.required
      ],
      provinceBirth: [
        this.defaultValues.provinceBirth, 
        Validators.required
      ],
      cityBirth: [
        this.defaultValues.cityBirth, 
        Validators.required
      ],
      parishBirth: [
        this.defaultValues.parishBirth, 
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
}

