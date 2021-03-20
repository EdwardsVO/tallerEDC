import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechNavbarComponent } from './mech-navbar.component';

describe('MechNavbarComponent', () => {
  let component: MechNavbarComponent;
  let fixture: ComponentFixture<MechNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MechNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
