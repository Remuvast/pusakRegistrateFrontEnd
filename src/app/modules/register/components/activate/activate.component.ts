import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivateAccountService } from '../../services/activate-acount.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent implements OnInit {

  status$: BehaviorSubject<number> = new BehaviorSubject(-1);
  url = environment.casLogin

  constructor(
    private route: ActivatedRoute,
    private activateAccountService: ActivateAccountService,
    private cdr: ChangeDetectorRef,
  ) {
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['codigo'];
      const id = params['id'];
      if(code && id) {
        this.activateAccountService.activateAccount(code, id).subscribe();
      }
    });
    this.activateAccountService.status$.subscribe(value => {
      if(typeof value === 'boolean') {
        this.status$.next(value ? 1 : 0);
      }
      this.cdr.detectChanges();
    })
  }
}
