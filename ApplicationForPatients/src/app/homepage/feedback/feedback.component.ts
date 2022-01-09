import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/service/feedback.service';
import { LeaveFeedback } from 'src/app/shared/leaveFeedback';
import { NotificationService } from 'src/app/service/notification_service/notification.service';
import jwt_decode from 'jwt-decode';
import { PatientService } from 'src/app/service/patient.service';
import { PatientJWT } from 'src/app/shared/patientJWT';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  token: any;
  decoded: any;
  leaveFeedback: LeaveFeedback;
  userId: any;
  patient: PatientJWT;
  title = 'toaster-not';
  disabled: boolean = false;

  constructor(private feedbackService: FeedbackService, 
              private notifyService: NotificationService, private patientService: PatientService) { }
  
  ngOnInit(): void {

    // Here we get username from JSON Web Token
    this.token = localStorage.getItem("jwt");
    this.decoded = jwt_decode(this.token?.toString()); 
    var username = this.decoded['sub'];
    
    // Here we get patient by username 
    this.patientService.getPatientByUserName(username).subscribe( response => { 
      this.patient = response;
    });

    this.leaveFeedback = new LeaveFeedback();
    this.leaveFeedback.anonymous = false;

  }

  addNewFeedback(): void {
    if(this.leaveFeedback.text === '' || this.leaveFeedback.text === undefined){
      this.showToasterError()
      return;
    }
    
    // Here we set patient Id to new feedback
    this.leaveFeedback.personId = this.patient.id;

    this.feedbackService.addFeedback(this.leaveFeedback).subscribe((response) => {
      this.disabled = true;
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
