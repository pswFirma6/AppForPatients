import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/service/feedback.service';
import { LeaveFeedback } from 'src/app/shared/leaveFeedback';
import { NotificationService } from 'src/app/service/notification_service/notification.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  
  leaveFeedback: LeaveFeedback;
  title = 'toaster-not';
  
  constructor(private feedbackService: FeedbackService, 
              private notifyService : NotificationService) { }
  
  ngOnInit(): void {
    this.leaveFeedback = new LeaveFeedback();
    this.leaveFeedback.anonymous = false;
  }

  addNewFeedback(): void {
    if(this.leaveFeedback.text === '' || this.leaveFeedback.text === undefined){
      this.showToasterError()
      return;
    }

    this.leaveFeedback.personId = 1;
  
    this.feedbackService.addFeedback(this.leaveFeedback).subscribe((response) => {
      this.showToasterSuccess()
    });

  } 
  
  showToasterSuccess(){
    this.notifyService.showSuccess("The feedback has been added!", "Success!")
  }
 
  showToasterError(){
    this.notifyService.showError("You need to complete the form! ", "Error!")
  }

  isCheckedAnonymous(value: boolean){
    this.leaveFeedback.anonymous = value;
  }

  isCheckedPublish(value: boolean){
    this.leaveFeedback.publish = value;
  }

}
