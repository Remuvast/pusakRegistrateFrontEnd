import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../models/register.model';
import { Subscription } from 'rxjs';
import { validateEcuadorianIdentification } from 'src/app/validators/identification.validator';
import { maxDateValidator } from 'src/app/validators/birthdate.validator';
import { CI, CONSTANTS } from 'src/app/common/const';
import { CatalogService } from '../../services/catalog.service';
import { Catalogs, CatalogTypes } from '../../models/catalog.model';
import { matchFields } from 'src/app/validators/match-fields.validator';
import { notMatchFields } from 'src/app/validators/not-match-fields.validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { WSService } from '../../services/ws.service';
import { CivilRegistry } from '../../models/civil-registry.model';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';
import { normalize } from 'src/app/validators/fullname.validator';

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
  identificationTypes: Catalogs[] = [];
  genders: Catalogs[] = [];
  maritalStatuses: Catalogs[] = [];
  ethnicities: Catalogs[] = [];
  disabilityTypes: Catalogs[] = [];
  nacionalities: Catalogs[] = [];
  countries: Location[] = [];
  provinces: Location[] = [];
  cities: Location[] = [];
  parishes: Location[] = [];
  blockNames: boolean = false;
  fullname: string = '';

  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
    private wsService: WSService,
    private locationService: LocationService,
  ) {
    
  }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, !!this.form?.get('identificationType')?.value);
    this.form?.get('disability')?.valueChanges.subscribe(value => {
      this.updateValidations(value);
    });
    this.spinner.show()
    this.getCatalogs()
    this.getCountries()
    this.loadCatalogs()
    this.spinner.hide()
    this.form.valueChanges.subscribe(values => {
      if(this.f.identificationType.value === CI) {
        const name = values.name;
        const lastName = values.lastName;
        if(name && lastName) {
          const combinated = `${lastName} ${name}`.trim();
          if(combinated === this.fullname) {
            this.removeErrors()
          } else {
            this.addErrors()
          }
        } else {
          this.removeErrors()
        }
      } else {
        this.removeErrors()
      }
    })
  }

  loadCatalogs(): void {
    this.catalogService.disability$.subscribe((disabilities: Catalogs[]) => {
      if(disabilities && disabilities.length > 0 && this.disabilityTypes.length === 0) {
        this.disabilityTypes = disabilities;
      }
    })
    this.catalogService.ethnicity$.subscribe((ethnicities: Catalogs[]) => {
      if(ethnicities && ethnicities.length > 0 && this.ethnicities.length === 0) {
        this.ethnicities = ethnicities
      }
    })
    this.catalogService.identificationType$.subscribe((identificationTypes: Catalogs[]) => {
      if(identificationTypes && identificationTypes.length > 0 && this.identificationTypes.length === 0) {
        this.identificationTypes = identificationTypes
      }
    })
    this.catalogService.maritalStatus$.subscribe((maritalStautes: Catalogs[]) => {
      if(maritalStautes && maritalStautes.length > 0 && this.maritalStatuses.length === 0) {
        this.maritalStatuses = maritalStautes
      }
    })
    this.catalogService.nacionality$.subscribe((nacionalities: Catalogs[]) => {
      if(nacionalities && nacionalities.length > 0 && this.nacionalities.length === 0) {
        this.nacionalities = nacionalities
      }
    })
    this.catalogService.gender$.subscribe((genders: Catalogs[]) => {
      if(genders && genders.length > 0 && this.genders.length === 0) {
        this.genders = genders
      }
    })
    this.locationService.countriesBirth$.subscribe(countries => {
      if(countries && countries.length > 0 && this.countries.length === 0) {
        this.countries = countries;
      }
    })
    this.locationService.provincesBirth$.subscribe(provinces => {
      if(provinces && provinces.length > 0) {
        this.provinces = provinces;
      }
    })
    this.locationService.citiesBirth$.subscribe(cities => {
      if(cities && cities.length > 0) {
        this.cities = cities;
      }
    })
    this.locationService.parishesBirth$.subscribe(parishes => {
      if(parishes && parishes.length > 0) {
        this.parishes = parishes;
      }
    })
    this.wsService.civilRegistry$.subscribe((data: CivilRegistry | null) => {
      if(data) {
        const maritalStatus = this.maritalStatuses.filter(x => x.name.toLocaleLowerCase() === data.maritalStatus.toLocaleLowerCase());
        const gender = this.genders.filter(x => x.name === data.sex);
        const [day, month, year] = data.birthDate.split('/');
        const formattedDate = `${year}-${month}-${day}`;
        this.fullname = normalize(data.fullName)
        this.form.patchValue({
          name: data.name,
          lastName: data.lastName,
          maritalStatus: maritalStatus[0]?.id,
          birthdate: formattedDate,
          gender: gender[0]?.id,
          fullName: normalize(data.fullName),
        });
        this.form.get('birthdate')?.disable();
        this.form.get('maritalStatus')?.disable();
        this.form.get('gender')?.disable();
        this.form.get('identification')?.disable();
        if(data.blockNames) {
          this.form.get('name')?.disable();
          this.form.get('lastName')?.disable();
        } else {
          this.form.get('name')?.enable();
          this.form.get('lastName')?.enable();
        }
        this.blockNames = data.blockNames;
      } else {
        //hacer lo del toast
        //this.toast
      }
    })
  }

  getCountries(): void {
    this.locationService.getCountries().subscribe();
  }

  getProvinces(): void {
    const countryId: number = this.f.countryBirth.value;
    this.locationService.getProvinces(countryId, true).subscribe();
  }

  getCities(): void {
    const provinceId: number = this.f.provinceBirth.value;
    this.locationService.getCities(provinceId, true).subscribe();
  }

  getParishes(): void {
    const cityId: number = this.f.cityBirth.value;
    this.locationService.getParishes(cityId, true).subscribe();
  }

  getCatalogs(): void {
    this.catalogService.getOptionsCatalog(CatalogTypes.IDENTIFICATION_TYPE).subscribe();
    this.catalogService.getOptionsCatalog(CatalogTypes.GENDERS).subscribe();
    this.catalogService.getOptionsCatalog(CatalogTypes.MARITAL_STATUS).subscribe();
    this.catalogService.getOptionsCatalog(CatalogTypes.ETHNICITY).subscribe();
    this.catalogService.getOptionsCatalog(CatalogTypes.DISABILITY).subscribe();
    this.catalogService.getOptionsCatalog(CatalogTypes.NACIONALITY).subscribe();
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
    this.form.get('birthdate')?.enable();
    this.form.get('maritalStatus')?.enable();
    this.form.get('gender')?.enable();
    this.form.get('name')?.enable();
    this.form.get('identification')?.enable();
    this.form.get('lastName')?.enable();
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

  checkIdentification(): void {
    if(!!this.f.identificationType.value && this.f.identification.value){
      if(this.checkIdentificationType()) {
        const validIdentification = validateEcuadorianIdentification(this.f.identification.value)
        const identificationControl = this.f.identification;
        const currentErrors = identificationControl?.errors || {};
        if(validIdentification) {
          if(currentErrors.invalidDocument) {
            delete currentErrors.invalidDocument
          }
          identificationControl?.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
          this.checkCivilRegistryWS();
        } else {
          identificationControl?.setErrors({ ...currentErrors, invalidDocument: true });
        }
      }
    }
  }

  removeErrors(): void {
    const nameControl = this.f.name;
    const currentNameErrors = nameControl?.errors || {};
    const lastNameControl = this.f.lastName;
    const currentLastNameErrors = lastNameControl?.errors || {};
    if(currentNameErrors.invalidFullname) {
      delete currentNameErrors.invalidFullname
    }
    nameControl?.setErrors(Object.keys(currentNameErrors).length ? currentNameErrors : null);
    if(currentLastNameErrors.invalidFullname) {
      delete currentLastNameErrors.invalidFullname
    }
    lastNameControl?.setErrors(Object.keys(currentLastNameErrors).length ? currentLastNameErrors : null);
  }

  addErrors(): void {
    const nameControl = this.f.name;
    const currentNameErrors = nameControl?.errors || {};
    const lastNameControl = this.f.lastName;
    const currentLastNameErrors = lastNameControl?.errors || {};
    nameControl?.setErrors({ ...currentNameErrors, invalidFullname: true });
    lastNameControl?.setErrors({ ...currentLastNameErrors, invalidFullname: true });
  }
  
  checkCivilRegistryWS(): void {
    this.wsService.getDataFromCivilRegister(this.f.identification.value).subscribe();
  }

  checkIdentificationType(): boolean {
    const value = this.identificationTypes.filter(x => CI === this.f.identificationType.value );
    return value.length > 0;
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
        fullname: [
          this.defaultValues.fullName,
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
            matchFields('emailAddress'),
          ]
        ],
        secondEmailAddress: [
          this.defaultValues.secondEmailAddress,
          [
            Validators.email,
            // eslint-disable-next-line no-useless-escape
            Validators.pattern(/^[a-zA-Z0-9](\.?[_.\-]*[a-zA-Z0-9]+)*@\w+([\.\-]\w+)*(\.[a-zA-Z]{2,})$/),
            Validators.maxLength(100),
            notMatchFields('emailAddress'),
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
            notMatchFields('cellPhone'),
          ]
        ],
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
      }
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
