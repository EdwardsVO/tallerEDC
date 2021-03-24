import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicAppointmentsListComponent } from './mechanic-appointments-list.component';

describe('MechanicAppointmentsListComponent', () => {
  let component: MechanicAppointmentsListComponent;
  let fixture: ComponentFixture<MechanicAppointmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicAppointmentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicAppointmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
