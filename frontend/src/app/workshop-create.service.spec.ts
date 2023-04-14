import { TestBed } from '@angular/core/testing';

import { WorkshopCreateService } from './workshop-create.service';

describe('WorkshopCreateService', () => {
  let service: WorkshopCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
