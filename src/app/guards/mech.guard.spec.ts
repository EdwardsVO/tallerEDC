import { TestBed } from '@angular/core/testing';

import { MechGuard } from './mech.guard';

describe('MechGuard', () => {
  let guard: MechGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MechGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
