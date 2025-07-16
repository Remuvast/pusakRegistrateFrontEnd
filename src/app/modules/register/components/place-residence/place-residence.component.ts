import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../models/register.model';
import { Subscription } from 'rxjs';
import { CONSTANTS, ECUADOR } from 'src/app/common/const';
import { LocationService } from '../../services/location.service';
import { Location } from "../../models/location.model";

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
  protected readonly labels = CONSTANTS.register.placeResidence
  countries: Location[] = [];
  provinces: Location[] = [];
  cities: Location[] = [];
  parishes: Location[] = [];
  showParishResidence: boolean = true;

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
    this.getCountries();
    this.loadCatalogs();
    this.form?.get('countryResidence')?.valueChanges.subscribe(value => {
      this.updateValidationsParishResidence(value);
    });
    if(this.defaultValues.countryResidence) {
      const country = this.countries.find(x => x.id?.toString() === this.defaultValues.countryResidence && x.name === ECUADOR)
      if(country) {
        this.showParishResidence = true;
      } else {
        this.showParishResidence = false;
      }
    }
  }

  loadCatalogs(): void {
    this.locationService.countries$.subscribe(countries => {
      if(countries && this.countries.length === 0) {
        this.countries = countries;
      }
    })
    this.locationService.provinces$.subscribe(provinces => {
      if(provinces) {
        this.provinces = provinces;
      }
    })
    this.locationService.cities$.subscribe(cities => {
      if(cities) {
        this.cities = cities;
      }
    })
    this.locationService.parishes$.subscribe(parishes => {
      if(parishes) {
        this.parishes = parishes;
      }
    })
  }
  getCountries(): void {
    if(this.countries.length === 0 ) {
      this.locationService.getCountries().subscribe();
    }
  }

  getProvinces(): void {
    const countryId: number = this.f.countryResidence.value;
    this.locationService.getProvinces(countryId).subscribe();
    this.form.patchValue({
      provinceResidence: '',
      cityResidence: '',
      parishResidence: '',
    })
  }

  getCities(): void {
    const provinceId: number = this.f.provinceResidence.value;
    this.locationService.getCities(provinceId).subscribe();
    this.form.patchValue({
      cityResidence: '',
      parishResidence: '',
    })
  }

  getParishes(): void {
    const cityId: number = this.f.cityResidence.value;
    if(this.countries.find(x => x.id.toString() === this.f.countryResidence.value && x.name === ECUADOR)) {
      this.locationService.getParishes(cityId).subscribe();
      this.form.patchValue({
        parishResidence: '',
      })
    }
  }

  updateValidationsParishResidence(value: string) {
    const country = this.countries.find(x => x.id.toString() === value && x.name === ECUADOR);
    const parishResidence = this.form.get('parishResidence');
    if(country) {
      this.showParishResidence = true;
      parishResidence?.setValidators(
        [
          Validators.required,
        ]);
    } else {
      this.showParishResidence = false;
      parishResidence?.clearValidators();
      parishResidence?.setValue('');
    }
    parishResidence?.updateValueAndValidity();
  }

  initForm(): void {
    this.form = this.fb.group({
      countryResidence: [
        this.defaultValues.countryResidence,
        [
          Validators.required,
        ],
      ],
      provinceResidence: [
        this.defaultValues.provinceResidence,
        [
          Validators.required,
        ],
      ],
      cityResidence: [
        this.defaultValues.cityResidence,
        [
          Validators.required,
        ],
      ],
      parishResidence: [
        this.defaultValues.parishResidence,
        [
          Validators.required,
        ],
      ],
      zone: [
        this.defaultValues.zone
      ],
      sector: [
        this.defaultValues.sector,
        [
          Validators.required,
          Validators.maxLength(50)
        ],
      ],
      street: [
        this.defaultValues.sector,
        [
          Validators.required,
          Validators.maxLength(50)
        ],
      ],
      secondaryStreet: [
        this.defaultValues.secondaryStreet,
        [
          Validators.required,
          Validators.maxLength(50)
        ],
      ],
      number: [
        this.defaultValues.number,
        [
          Validators.required,
          Validators.maxLength(20)
        ],
      ],
      geographicReference: [
        this.defaultValues.geographicReference,
        [
          Validators.required,
          Validators.maxLength(200)
        ],
      ],
      postalCode: [
        this.defaultValues.postalCode,
        Validators.maxLength(20)
      ],
    });
    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, this.form.valid);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  setZone(): void {
    const parish = this.parishes.find(x => x.id.toString() === this.f.parishResidence.value);
    if(parish) {
      this.form.patchValue({
        zone: parish.type,
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
