import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentWaitlistComponent } from './appointment-waitlist.component';

describe('AppointmentWaitlistComponent', () => {
  let component: AppointmentWaitlistComponent;
  let fixture: ComponentFixture<AppointmentWaitlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentWaitlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentWaitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
