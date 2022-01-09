import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GlobalSettings } from '../global';
import { Registration } from "../shared/registration";
import { CustomEncoder } from '../shared/custom-encoder';



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
    return this.http.post<Registration>(this.registrationUrl, registration);
  }
  
}
