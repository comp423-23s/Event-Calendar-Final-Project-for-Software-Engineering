import { TestBed } from '@angular/core/testing';

import { WorkshopDeleteService } from './workshop-delete.service';

describe('WorkshopDeleteService', () => {
  let service: WorkshopDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
