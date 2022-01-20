import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-homepage-layout',
  templateUrl: './homepage-layout.component.html',
  styleUrls: ['./homepage-layout.component.css']
})
export class HomepageLayoutComponent implements OnInit {
  token: any;

  constructor(private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.isPatientAuthenticated()
  }

  isPatientAuthenticated() {
    this.token = localStorage.getItem("jwt");
    if(this.token && !this.jwtHelper.isTokenExpired(this.token)) {
      return true;
    } else {
      return false;
    }
  }

}
