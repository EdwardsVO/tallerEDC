import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInfoMComponent } from './vehicle-info-m.component';

describe('VehicleInfoMComponent', () => {
  let component: VehicleInfoMComponent;
  let fixture: ComponentFixture<VehicleInfoMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleInfoMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInfoMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
