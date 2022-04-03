import { Routes } from "@angular/router";
import { AppointmentPriorityComponent } from "src/app/homepage/appointment/appointment-priority/appointment-priority.component";
import { FeedbackComponent } from "../feedback/feedback.component";
import { MedicalrecordsComponent } from "../medicalrecords/medicalrecords.component";
import { NewAppointmentComponent } from "../appointment/new-appointment/new-appointment.component";
import { SurveyComponent } from "../survey/survey.component";
import { HospitalFeedbacksComponent } from "../hospital-feedbacks/hospital-feedbacks.component";

export const HomepageLayoutRoutes: Routes = [
    { path: 'givefeedback', component: FeedbackComponent},
    { path: 'viewfeedback', component: HospitalFeedbacksComponent },
    { path: 'medicalrecords', component: MedicalrecordsComponent },
    { path: 'newAppointment', component: NewAppointmentComponent },
    { path: 'takesurvey', component: SurveyComponent },
    { path: 'appointmentPriority', component: AppointmentPriorityComponent }
]