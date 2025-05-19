import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivateAccountService } from '../../services/activate-acount.service';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private activateAccountService: ActivateAccountService,
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
  }
}
