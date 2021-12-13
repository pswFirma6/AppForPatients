import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { GlobalSettings } from "../global";
import { Appointment } from "../shared/appointment";
import { Term } from "../shared/term";
import { FreeTerms } from "../shared/free-term";


@Injectable({
    providedIn: 'root',
  })
  export class AppointmentService {
      
    appointmentUrl = GlobalSettings.baseUrl + "/api/Appointment";

    constructor(private http: HttpClient) { }

    public getAvailableDoctors(term: Term): Observable<FreeTerms>{
        return this.http.post<FreeTerms>(this.appointmentUrl+'/doctorAppintments', term)
        .pipe(
          catchError(this.handleError)
        );
    }

    public addNewAppointment(appointmentForm : Appointment): Observable<Appointment>{
      return this.http.post<Appointment>(this.appointmentUrl, appointmentForm )
      .pipe(
        catchError(this.handleError)
      );
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