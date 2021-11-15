import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RegistrationComponent } from "../registration/registration.component";

@NgModule ({
    imports: [
        CommonModule,
        
    ],
    declarations: [
        RegistrationComponent
    ],
    exports: [
        RegistrationComponent
    ]
})

export class RegistrationLayoutModule { }
