import { TestBed } from '@angular/core/testing';

import { WorkshopUpdateService } from './workshop-update.service';

describe('WorkshopUpdateService', () => {
  let service: WorkshopUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
