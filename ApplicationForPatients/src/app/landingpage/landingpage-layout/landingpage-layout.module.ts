import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavigationBarComponent } from "../basic-layout/navigation-bar/navigation-bar.component";
@NgModule ({
    imports: [
        CommonModule,
        
    ],
    declarations: [
        NavigationBarComponent,
       
    ],
    exports: [
        NavigationBarComponent,
        
    ]
})

export class LandingpageLayoutModule { }

