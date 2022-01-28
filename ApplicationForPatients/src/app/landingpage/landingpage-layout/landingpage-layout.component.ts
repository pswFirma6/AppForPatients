import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/shared/feedback';
import { FeedbackService } from 'src/app/service/feedback.service';
import { LandingpageService } from 'src/app/service/landingpage.service';
import { Ad } from 'src/app/shared/Ad';

@Component({
  selector: 'app-landingpage-layout',
  templateUrl: './landingpage-layout.component.html',
  styleUrls: ['./landingpage-layout.component.css']
})
export class LandingpageLayoutComponent implements OnInit {
  
  public feedbacks: Feedback[] = [];
  public Ads: Ad[] =[];
  constructor(private feedbackService: FeedbackService, private landingpageService: LandingpageService) { }
  defaultImageUrl = "assets/img/img_landing/default-ad-image-croped.jpg";
  ngOnInit(): void {
    
    this.logOut()
    this.feedbackService.getFeedbacks().subscribe(res => {
      this.feedbacks = res;
    });
    this.landingpageService.getAds().subscribe(res =>{
      this.Ads = res;
      console.log(this.Ads[0].pharmacyName);
    })
    
  }

  logOut() {
    localStorage.removeItem("jwt");
  }

}
