import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/shared/survey';
import { NotificationService } from 'src/app/service/notification_service/notification.service';
import { SurveyService } from 'src/app/service/survey.service';
import { PatientService } from 'src/app/service/patient.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-takesurvey',
  templateUrl: './takesurvey.component.html',
  styleUrls: ['./takesurvey.component.css']
})
export class TakesurveyComponent implements OnInit {
  public survey: Survey[] = [];
  public surveyHospital: Survey[] = [];
  public surveyStaff: Survey[] = [];
  public surveyApplication: Survey[] = [];
  public token: any;
  public decoded: any;
  public patient: any;

  constructor(private surveyService: SurveyService, private notifyService : NotificationService,
              private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {

    // Here we get username from JSON Web Token
    this.token = localStorage.getItem("jwt");
    this.decoded = jwt_decode(this.token?.toString()); 
    var username = this.decoded['sub'];
    
    // Here we get patient by username 
    this.patientService.getPatientByUserName(username).subscribe( response => { 
      this.patient = response;
    });

    this.surveyService.initializeSurvey().subscribe(res => {
      this.survey = res;
      this.sort();
    });
  }

  public takeSurvey(): void {
    
    if(!this.validateSurvey()){
      this.showToasterError()
      return;
    }

    for(let s of this.survey){
      s.rate = Number(s.rate)
      s.personId = this.patient.id;
    }

    this.surveyService.addSurvey(this.survey).subscribe((response)=>{
      this.showToasterSuccess();
      setTimeout(() => this.router.navigate(['/patient/medicalrecords']), 500);
    });
  }

  showToasterError(){
    this.notifyService.showError("You need to complete the form! ", "Error!")
  }

  showToasterSuccess(){
    this.notifyService.showSuccess("The survey has been added!", "Success!")
  }

  public validateSurvey(): boolean{
    for(let tmp of this.survey){
      if(tmp.rate == 0){
        return false
      }
    }
    return true;
  }

  public sort(): void {
    for(let tmp of this.survey){
      switch(tmp.category){
        case 0:
          this.surveyHospital.push(tmp);
          break;
        case 1:
          this.surveyStaff.push(tmp);
          break;
        case 2:
          this.surveyApplication.push(tmp);
          break; 
      }
    }
  }
}
