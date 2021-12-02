import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;

  constructor(private _registrationService: RegistrationService, 
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail = () => {
    this.showError = this.showSuccess = false;
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];
    console.log(token);
    this._registrationService.confirmEmail(token, email)
    .subscribe(res => {
      this.showSuccess = true;
    },
    error => {
      this.showError = true;
      this.errorMessage = error;
    })
  }
}
