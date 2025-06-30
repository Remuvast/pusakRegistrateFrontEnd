import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceResidenceComponent } from './place-residence.component';

describe('PlaceResidenceComponent', () => {
  let component: PlaceResidenceComponent;
  let fixture: ComponentFixture<PlaceResidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceResidenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
