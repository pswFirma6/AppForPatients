import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { AppointmentPriorityComponent } from "src/app/homepage/appointment-priority/appointment-priority.component";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { FeedbackComponent } from "../feedback/feedback.component";
import { MedicalrecordsComponent } from "../medicalrecords/medicalrecords.component";
import { TakesurveyComponent } from "../takesurvey/takesurvey.component";
import { ViewfeedbackComponent } from "../viewfeedback/viewfeedback.component";
import { HomepageLayoutRoutes } from "./homepage-layout.routing";


@NgModule ({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(HomepageLayoutRoutes),
        ToastrModule.forRoot()
    ],
    declarations: [
        NavbarComponent,
        SidebarComponent,
        FeedbackComponent,
        ViewfeedbackComponent,
        MedicalrecordsComponent,
        TakesurveyComponent,
        AppointmentPriorityComponent
    ],
    exports: [
        NavbarComponent,
        SidebarComponent,
        FeedbackComponent,
        
        
    ]
})

export class HomepageLayoutModule { }


