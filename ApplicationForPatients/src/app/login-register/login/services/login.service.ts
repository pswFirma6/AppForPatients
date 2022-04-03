import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { GlobalSettings } from "src/app/global";

@Injectable({
    providedIn: 'root',
  })
export class LoginService {
      
    loginUrl = GlobalSettings.baseUrl + "/api/Login";

    constructor(private http: HttpClient) { }

    public login(credentials: any): Observable<any>{
        return this.http.post<any>(this.loginUrl, credentials)
    }

}