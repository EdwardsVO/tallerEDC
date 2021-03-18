import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageStatisticsComponent } from './garage-statistics.component';

describe('GarageStatisticsComponent', () => {
  let component: GarageStatisticsComponent;
  let fixture: ComponentFixture<GarageStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarageStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
