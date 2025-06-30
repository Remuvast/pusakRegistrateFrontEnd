import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { ActivateComponent } from './components/activate/activate.component';


const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      {
        path: 'register',
        redirectTo: 'register',
        pathMatch: 'full',
      },
      {
        path: 'register',
        component: MainFormComponent,
        data: { returnUrl: window.location.pathname },
      },
      {
        path: 'activate',
        component: ActivateComponent,
        data: { returnUrl: window.location.pathname },
      },
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: '**', redirectTo: 'register', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
