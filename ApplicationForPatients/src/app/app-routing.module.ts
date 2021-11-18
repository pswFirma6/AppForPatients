import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageLayoutComponent } from './homepage/homepage-layout/homepage-layout.component';
import { LandingpageLayoutComponent } from './landingpage/landingpage-layout/landingpage-layout.component';
import { NotFoundComponent } from './page-not-found/not-found/not-found.component';
import { RegistrationLayoutComponent } from './registration/registration-layout/registration-layout.component';

const routes: Routes = [
  
  {
    
    path: '',
    component: NotFoundComponent
   }, 

  {
    
   path: 'landingpage',
   component: LandingpageLayoutComponent
  }, 
  {
    path: 'patient',
    component: HomepageLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./homepage/homepage-layout/homepage-layout.module').then(mod => mod.HomepageLayoutModule)
      }
    ]
    
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
    
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
