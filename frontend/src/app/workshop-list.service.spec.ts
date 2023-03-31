import { TestBed } from '@angular/core/testing';

import { WorkshopListService } from './workshop-list.service';

describe('WorkshopListService', () => {
  let service: WorkshopListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
