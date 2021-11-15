import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageLayoutComponent } from './homepage/homepage-layout/homepage-layout.component';
import { LandingpageLayoutComponent } from './landingpage/landingpage-layout/landingpage-layout.component';
const routes: Routes = [
  
  {
    
   path: '',
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
    
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
