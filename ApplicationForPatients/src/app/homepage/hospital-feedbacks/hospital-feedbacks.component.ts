import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../shared/feedback';
import { FeedbackService } from '../../service/feedback.service';

@Component({
  selector: 'app-hospital-feedbacks',
  templateUrl: './hospital-feedbacks.component.html',
  styleUrls: ['./hospital-feedbacks.component.css']
})
export class HospitalFeedbacksComponent implements OnInit {

  public feedbacks: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    
    this.feedbackService.getFeedbacks().subscribe(res => {
      this.feedbacks = res;
    });
    
  }

}
