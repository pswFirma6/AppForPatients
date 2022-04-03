import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RegistrationComponent } from "../registration/registration.component";

@NgModule ({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        RegistrationComponent
    ],
    exports: [
        RegistrationComponent
    ]
})

export class RegistrationLayoutModule { }
