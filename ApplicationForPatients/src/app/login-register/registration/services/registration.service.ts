import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GlobalSettings } from 'src/app/global';
import { CustomEncoder } from 'src/app/shared/custom-encoder';
import { Registration } from 'src/app/shared/registration';


@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  

  registrationUrl = GlobalSettings.baseUrl + "/api/Registration";
  activationUrl = GlobalSettings.baseUrl + "/api/Registration/EmailConfirmation";

  constructor(private http: HttpClient) { }

  public confirmEmail = (token: string, email: string) => {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);
    return this.http.get(this.activationUrl, { params: params });
  }

  sendRegistration(registration: Registration): Observable<Registration> {
    console.log(registration)
    return this.http.post<Registration>(this.registrationUrl, registration)
  }

}
