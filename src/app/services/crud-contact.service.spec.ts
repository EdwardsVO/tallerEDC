import { TestBed } from '@angular/core/testing';

import { CrudContactService } from './crud-contact.service';

describe('CrudContactService', () => {
  let service: CrudContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
