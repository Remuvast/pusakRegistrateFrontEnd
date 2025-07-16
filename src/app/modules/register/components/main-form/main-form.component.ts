import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, first, Subscription } from 'rxjs';
import { init, IRegister, IRegisterSuccess } from '../../models/register.model';
import { CONSTANTS } from 'src/app/common/const';
import { LocationService } from '../../services/location.service';
import { CatalogService } from '../../services/catalog.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {

  formsCount = 4;
  register$: BehaviorSubject<IRegister> =
    new BehaviorSubject<IRegister>(init);
  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private unsubscribe: Subscription[] = [];
  protected readonly labels = CONSTANTS.register

  constructor(
    private catalogService: CatalogService,
    private locationService: LocationService,
    private registerService: RegisterService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.catalogService.disabilitiesUpdated.subscribe(() => {
      this.cdr.detectChanges();
    })
    this.catalogService.ethnicitiesUpdated.subscribe(() => {
      this.cdr.detectChanges();
    })
    this.catalogService.identificationTypesUpdated.subscribe(() => {
      this.cdr.detectChanges();
    })
    this.catalogService.maritalStatusesUpdated.subscribe(() => {
      this.cdr.detectChanges();
    })
    this.catalogService.nacionalitiesUpdated.subscribe(() => {
      this.cdr.detectChanges();
    })
    this.catalogService.gendersUpdated.subscribe(() => {
      this.cdr.detectChanges();
    })
    this.locationService.countriesUpdated.subscribe(() => {
      this.cdr.detectChanges()
    });
    this.locationService.provincesUpdated.subscribe(() => {
      this.cdr.detectChanges()
    });
    this.locationService.citiesUpdated.subscribe(() => {
      this.cdr.detectChanges()
    });
    this.locationService.parishesUpdated.subscribe(() => {
      this.cdr.detectChanges()
    });
    this.locationService.countriesBirthUpdated.subscribe(() => {
      this.cdr.detectChanges()
    });
    this.locationService.provincesBirthUpdated.subscribe(() => {
      this.cdr.detectChanges()
    });
    this.locationService.citiesBirthUpdated.subscribe(() => {
      this.cdr.detectChanges()
    });
    this.locationService.parishesBirthUpdated.subscribe(() => {
      this.cdr.detectChanges()
    });
  }

  updateRegister = (part: Partial<IRegister>, isFormValid: boolean) => {
    const currentRegister = this.register$.value;
    const updatedRegister = { ...currentRegister, ...part };
    this.register$.next(updatedRegister);
    this.isCurrentFormValid$.next(isFormValid);
  };

  nextStep(): void {
    const nextStep = this.currentStep$.value + 1;
    if(nextStep === 4) {
      this.saveForm(nextStep)
      return;
    }
    if (nextStep > this.formsCount) {
      return;
    }
    this.currentStep$.next(nextStep);
    this.moveToUp();
  }

  prevStep(): void {
    const prevStep = this.currentStep$.value - 1;
    const currentRegister = this.register$.value;
    this.register$.next(currentRegister);
    this.isCurrentFormValid$.next(true);
    if (prevStep === 0) {
      return;
    }
    this.currentStep$.next(prevStep);
    this.moveToUp();
  }

  moveToUp() {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  saveForm(nextStep: number): void {
    this.register$.subscribe(form =>{
      this.registerService.saveRegister(form)
        .pipe(first())
        .subscribe({
          next: (result: IRegisterSuccess | boolean) => {
            if(result) {
              this.currentStep$.next(nextStep);
              this.cdr.detectChanges()
            }
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
