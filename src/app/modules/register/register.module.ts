import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslationModule } from '../i18n';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { PlaceBirthComponent } from './components/place-birth/place-birth.component';
import { PlaceResidenceComponent } from './components/place-residence/place-residence.component';
import { RegisterComponent } from './register.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { PasswordSecurityComponent } from './components/password-security/password-security.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { FinalFormComponent } from './components/final-form/final-form.component';



@NgModule({
  declarations: [
    PersonalInformationComponent,
    PlaceBirthComponent,
    PlaceResidenceComponent,
    PasswordSecurityComponent,
    RegisterComponent,
    MainFormComponent,
    FinalFormComponent,
  ],
  imports: [
      CommonModule,
      TranslationModule,
      RegisterRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgbTooltipModule,
      SharedModule,
      HttpClientModule,
  ],
  exports: [],
  providers: [DatePipe],
})
export class RegisterModule { }
