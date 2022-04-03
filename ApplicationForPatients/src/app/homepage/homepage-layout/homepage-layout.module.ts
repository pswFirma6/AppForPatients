import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { AppointmentPriorityComponent } from "../appointment/appointment-priority/appointment-priority.component";
import { FeedbackComponent } from "../feedback/feedback.component";
import { MedicalrecordsComponent } from "../medicalrecords/medicalrecords.component";
import { NewAppointmentComponent } from "../appointment/new-appointment/new-appointment.component";
import { SurveyComponent } from "../survey/survey.component";
import { HospitalFeedbacksComponent } from "../hospital-feedbacks/hospital-feedbacks.component";
import { HomepageLayoutRoutes } from "./homepage-layout.routing";
import { NavbarComponent } from "../basic-layout/navbar/navbar.component";
import { SidebarComponent } from "../basic-layout/sidebar/sidebar.component";
import { DatePickerComponent } from "../appointment/date-picker/date-picker.component";



@NgModule ({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(HomepageLayoutRoutes),
        ToastrModule.forRoot(),
        NgbModule 
    ],
    declarations: [
        NavbarComponent,
        SidebarComponent,
        FeedbackComponent,
        HospitalFeedbacksComponent,
        MedicalrecordsComponent,
        NewAppointmentComponent,
        SurveyComponent,
        AppointmentPriorityComponent,
        DatePickerComponent
    ],
    exports: [
        NavbarComponent,
        SidebarComponent,
        FeedbackComponent,
        SurveyComponent,
        
    ]
})

export class HomepageLayoutModule { }


