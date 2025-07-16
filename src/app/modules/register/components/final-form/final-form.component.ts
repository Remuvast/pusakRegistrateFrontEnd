import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-final-form',
  templateUrl: './final-form.component.html',
})
export class FinalFormComponent {

  url = environment.casLogin;
  constructor() {}
}
