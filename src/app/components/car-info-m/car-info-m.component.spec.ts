import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInfoMComponent } from './car-info-m.component';

describe('CarInfoMComponent', () => {
  let component: CarInfoMComponent;
  let fixture: ComponentFixture<CarInfoMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarInfoMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInfoMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
