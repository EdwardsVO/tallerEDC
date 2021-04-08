import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphMechComponent } from './graph-mech.component';

describe('GraphMechComponent', () => {
  let component: GraphMechComponent;
  let fixture: ComponentFixture<GraphMechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphMechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphMechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
