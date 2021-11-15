import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackService } from 'src/app/service/feedback.service';

@Component({
  selector: 'app-landingpage-layout',
  templateUrl: './landingpage-layout.component.html',
  styleUrls: ['./landingpage-layout.component.css']
})
export class LandingpageLayoutComponent implements OnInit {
  
  public feedbacks: Feedback[] = [];
  
  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {

    this.feedbackService.getFeedbacks().subscribe(res => {
      this.feedbacks = res;
    });
    
    
  }

}
