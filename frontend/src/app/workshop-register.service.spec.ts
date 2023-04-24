import { TestBed } from '@angular/core/testing';

import { WorkshopRegisterService } from './workshop-register.service';

describe('WorkshopRegisterService', () => {
  let service: WorkshopRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
