import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopUpdateComponent } from './workshop-update.component';

describe('WorkshopUpdateComponent', () => {
  let component: WorkshopUpdateComponent;
  let fixture: ComponentFixture<WorkshopUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
