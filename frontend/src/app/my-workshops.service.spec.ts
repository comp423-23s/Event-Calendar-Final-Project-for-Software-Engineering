import { TestBed } from '@angular/core/testing';

import { MyWorkshopsService } from './my-workshops.service';

describe('MyWorkshopsService', () => {
  let service: MyWorkshopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyWorkshopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
