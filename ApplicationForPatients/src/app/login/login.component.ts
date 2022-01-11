import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { NotificationService } from '../service/notification_service/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  invalidLogin: boolean;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
         private notifyService : NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      userType: 1
    });
  }

  login() : void {

    this.loginService.login(this.loginForm.value).subscribe((response)=>{
      if(response){
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        // this.showToasterSuccess();
        setTimeout(() => this.router.navigate(['/patient/medicalrecords']), 200);
      }
    }, error => {
        this.invalidLogin = true;
        console.log(error);
        if(error.status === 401)
          this.showToasterError();
        else if(error.status === 400)
          this.showToasterError();
    })
  }

  showToasterError(){
    this.notifyService.showError("Username or password is incorrect! ", "Error!")
  }

  // showToasterSuccess(){
  //   this.notifyService.showSuccess("Login successful!", "Success!")
  // }

}
