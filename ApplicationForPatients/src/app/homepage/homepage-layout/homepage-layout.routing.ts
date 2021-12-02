import { Routes } from "@angular/router";
import { FeedbackComponent } from "../feedback/feedback.component";
import { MedicalrecordsComponent } from "../medicalrecords/medicalrecords.component";
import { TakesurveyComponent } from "../takesurvey/takesurvey.component";
import { ViewfeedbackComponent } from "../viewfeedback/viewfeedback.component";

export const HomepageLayoutRoutes: Routes = [
    { path: 'givefeedback', component: FeedbackComponent},
    { path: 'viewfeedback', component: ViewfeedbackComponent },
    { path: 'medicalrecords', component: MedicalrecordsComponent },
    { path: 'takesurvey', component: TakesurveyComponent }
]