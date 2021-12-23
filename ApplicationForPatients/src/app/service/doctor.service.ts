import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { GlobalSettings } from "../global";
import { Doctor } from "../shared/doctor";
import { DoctorForReg } from "../shared/doctorForReg";

@Injectable({
    providedIn: 'root',
  })
  export class DoctorService {
      
      doctorUrl = GlobalSettings.baseUrl + "/api/Doctor";
  
      constructor(private http: HttpClient) { }
    
      public getAvailableDoctors(): Observable<DoctorForReg[]>{

          return this.http.get<DoctorForReg[]>(this.doctorUrl+'/Available');
      }

      public getDoctorsWithSpec(doctorType: String ): Observable<Doctor[]>{
          return this.http.get<Doctor[]>(this.doctorUrl+'/Specialists' + '/' + doctorType);
      }

      handleError(error: any) {

        let errorMessage = '';
     
        if (error.error instanceof ErrorEvent) {
     
          // client-side error
        
          errorMessage = `Error: ${error.error.message} `;
     
        } else {
     
          // server-side error
     
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     
        }
     
        window.alert(errorMessage);
     
        return throwError(errorMessage);
     
      }
}