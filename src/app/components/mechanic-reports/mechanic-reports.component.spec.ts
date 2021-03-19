import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicReportsComponent } from './mechanic-reports.component';

describe('MechanicReportsComponent', () => {
  let component: MechanicReportsComponent;
  let fixture: ComponentFixture<MechanicReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
