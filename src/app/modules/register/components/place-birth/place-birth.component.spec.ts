import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceBirthComponent } from './place-birth.component';

describe('PlaceBirthComponent', () => {
  let component: PlaceBirthComponent;
  let fixture: ComponentFixture<PlaceBirthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceBirthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceBirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
