import { ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { init, IRegister } from '../../models/register.model';
import { CONSTANTS } from 'src/app/common/const';
import { LocationService } from '../../services/location.service';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {

  formsCount = 5;
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
  }

  updateRegister = (part: Partial<IRegister>, isFormValid: boolean) => {
    const currentRegister = this.register$.value;
    const updatedRegister = { ...currentRegister, ...part };
    this.register$.next(updatedRegister);
    this.isCurrentFormValid$.next(isFormValid);
  };

  nextStep() {
    const nextStep = this.currentStep$.value + 1;
    if (nextStep > this.formsCount) {
      return;
    }
    this.currentStep$.next(nextStep);
  }

  prevStep() {
    const prevStep = this.currentStep$.value - 1;
    const currentRegister = this.register$.value;
    this.register$.next(currentRegister);
    this.isCurrentFormValid$.next(true);
    if (prevStep === 0) {
      return;
    }
    this.currentStep$.next(prevStep);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
