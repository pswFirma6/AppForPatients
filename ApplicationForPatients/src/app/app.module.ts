import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageLayoutComponent } from './homepage/homepage-layout/homepage-layout.component';
import { HomepageLayoutModule } from './homepage/homepage-layout/homepage-layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingpageLayoutComponent } from './landingpage/landingpage-layout/landingpage-layout.component';
import { LandingpageLayoutModule } from './landingpage/landingpage-layout/landingpage-layout.module';
import { RouterModule } from '@angular/router';
import { RegistrationLayoutComponent } from './registration/registration-layout/registration-layout.component';
import { RegistrationLayoutModule } from './registration/registration-layout/registration-layout.module';
import { NotFoundComponent } from './page-not-found/not-found/not-found.component';
import { ActivationComponent } from './registration/activation/activation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AppointmentPriorityComponent } from './homepage/appointment-priority/appointment-priority.component';




@NgModule({
  declarations: [
    AppComponent,
    HomepageLayoutComponent,
    LandingpageLayoutComponent,
    RegistrationLayoutComponent,
    NotFoundComponent,
    ActivationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([ ]),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HomepageLayoutModule,
    LandingpageLayoutModule,
    RegistrationLayoutModule

  ],
  providers: [ ],
  bootstrap: [AppComponent]

})
export class AppModule { }
