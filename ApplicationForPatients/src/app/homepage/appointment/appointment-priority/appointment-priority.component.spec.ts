import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPriorityComponent } from './appointment-priority.component';

describe('AppointmentPriorityComponent', () => {
  let component: AppointmentPriorityComponent;
  let fixture: ComponentFixture<AppointmentPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentPriorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
