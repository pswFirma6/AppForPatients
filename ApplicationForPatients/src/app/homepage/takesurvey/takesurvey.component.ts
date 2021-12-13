import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/shared/survey';
import { NotificationService } from 'src/app/service/notification_service/notification.service';
import { SurveyService } from 'src/app/service/survey.service';

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
  constructor(private surveyService: SurveyService, private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.surveyService.initializeSurvey().subscribe(res => {
      this.survey = res;
      this.sort();
      console.log(this.survey)
    });
  }

  public takeSurvey(): void {
    console.log(this.survey)
    if(!this.validateSurvey()){
      this.showToasterError()
      return;
    }
    this.surveyService.addSurvey(this.survey).subscribe((response)=>{
      this.showToasterSuccess();
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
