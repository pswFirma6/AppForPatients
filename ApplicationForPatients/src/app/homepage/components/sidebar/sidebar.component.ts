import { Component, OnInit } from '@angular/core';

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/patient/givefeedback', title: 'Leave feedback',  icon: 'pe-7s-like2', class: '' },
  { path: '/patient/viewfeedback', title: 'View feedback', icon:'pe-7s-news-paper', class: '' },
  { path: '/patient/medicalrecords', title: 'Medical records', icon:'pe-7s-note2', class: '' },
  { path: '/patient/takesurvey', title: 'Take survey', icon:'pe-7s-note2', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    
  menuItems: any[];
  
    constructor() { }
  
    ngOnInit() {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isMobileMenu() {
      if ( window.innerWidth > 991) {
        return false;
      }
      return true;
    }
}
