import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { MaterialModule } from "src/app/material.module";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { FeedbackComponent } from "../feedback/feedback.component";
import { MedicalrecordsComponent } from "../medicalrecords/medicalrecords.component";
import { NewAppointmentComponent } from "../new-appointment/new-appointment.component";
import { ViewfeedbackComponent } from "../viewfeedback/viewfeedback.component";
import { HomepageLayoutRoutes } from "./homepage-layout.routing";


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
        ViewfeedbackComponent,
        MedicalrecordsComponent,
        NewAppointmentComponent
    ],
    exports: [
        NavbarComponent,
        SidebarComponent,
        FeedbackComponent,
        
        
    ]
})

export class HomepageLayoutModule { }


