import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  selector: '<body[root]>',
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor() {}

  ngOnInit(): void {
    // BODY_CLASSES.forEach((c) => document.body.classList.add(c));
  }

  ngOnDestroy() {
    // BODY_CLASSES.forEach((c) => document.body.classList.remove(c));
  }

}
