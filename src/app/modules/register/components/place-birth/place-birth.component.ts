import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../models/register.model';
import { Subscription } from 'rxjs';
import { CONSTANTS } from 'src/app/common/const';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';

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
  countries: Location[] = [];
  provinces: Location[] = [];
  cities: Location[] = [];
  parishes: Location[] = [];
  private unsubscribe: Subscription[] = [];
  protected readonly labels = CONSTANTS.register.placeBirth
  
  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, false);
    this.getCountries()
    this.locationService.countries$.subscribe(countries => {
      if(countries && countries.length > 0) {
        this.countries = countries;
      }
    })
    this.locationService.provinces$.subscribe(provinces => {
      if(provinces && provinces.length > 0) {
        this.provinces = provinces;
      }
    })
    this.locationService.cities$.subscribe(cities => {
      if(cities && cities.length > 0) {
        this.cities = cities;
      }
    })
    this.locationService.parishes$.subscribe(parishes => {
      if(parishes && parishes.length > 0) {
        this.parishes = parishes;
      }
    })
  }

  getCountries(): void {
    this.locationService.getCountries().subscribe();
  }

  getProvinces(): void {
    const countryId: number = this.f.countryResidence.value;
    this.locationService.getProvinces(countryId).subscribe();
  }

  getCities(): void {
    const provinceId: number = this.f.provinceResidence.value;
    this.locationService.getCities(provinceId).subscribe();
  }

  getParishes(): void {
    const cityId: number = this.f.cityResidence.value;
    this.locationService.getParishes(cityId).subscribe();
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

