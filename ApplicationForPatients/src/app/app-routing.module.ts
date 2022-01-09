import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageLayoutComponent } from './homepage/homepage-layout/homepage-layout.component';
import { LandingpageLayoutComponent } from './landingpage/landingpage-layout/landingpage-layout.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './page-not-found/not-found/not-found.component';
import { ActivationComponent } from './registration/activation/activation.component';
import { RegistrationLayoutComponent } from './registration/registration-layout/registration-layout.component';
import { AuthGuard } from './service/guards/auth-guard.service';

const routes: Routes = [
  
{path: '', redirectTo: 'landingpage', pathMatch: 'full'},

  {
   path: 'landingpage',
   component: LandingpageLayoutComponent,
   children: [
    {
      path: '',
      loadChildren: () => import('./landingpage/landingpage-layout/landingpage-layout.module').then(mod => mod.LandingpageLayoutModule)
    }
  ]
  }, 
  {
    path: 'authentication/emailconfirmation',
    component: ActivationComponent
  },
  {
    path: 'patient',
    component: HomepageLayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./homepage/homepage-layout/homepage-layout.module').then(mod => mod.HomepageLayoutModule)
      }
    ]
    
  },
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'register',
    component: RegistrationLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./registration/registration-layout/registration-layout.module').then(mod => mod.RegistrationLayoutModule)
      }
    ]
    
  },
  {
    path: '**',
    component: NotFoundComponent
   }, 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
