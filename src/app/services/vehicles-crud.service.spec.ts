import { TestBed } from '@angular/core/testing';

import { VehiclesCrudService } from './vehicles-crud.service';

describe('VehiclesCrudService', () => {
  let service: VehiclesCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
