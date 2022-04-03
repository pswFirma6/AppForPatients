import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalFeedbacksComponent } from './hospital-feedbacks.component';

describe('ViewfeedbackComponent', () => {
  let component: HospitalFeedbacksComponent;
  let fixture: ComponentFixture<HospitalFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalFeedbacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
