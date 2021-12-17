import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "../global";
import { freeTerms, freeTermsList, selectedTerm } from "../shared/appointmentPriority";


@Injectable({
    providedIn: 'root',
})
export class AppointmentPriorityService {
    apppointmentUrl = GlobalSettings.baseUrl + "/api/appointment";
    doctorUrl = GlobalSettings.baseUrl + "/api/doctor";
    constructor(private http: HttpClient){ }

    public getDoctors(): Observable<any[]>{
        return this.http.get<any[]>(this.doctorUrl + "/All");
    }

    public searchTerms(date: Date, doctorId: number, priority: string): Observable<freeTermsList>{
        let request = {
            date: date.toString(), 
            doctorId: doctorId, 
            priority: priority
        }
        console.log(request)
        return this.http.post<freeTermsList>(this.apppointmentUrl + "/priority", request);
    }

    public AddAppointment(date: string, patientId: number, doctorId: number): Observable<selectedTerm>{
        let AddTerm = {
            startTime: date,
            patientId: patientId,
            doctorId: doctorId
          }
        console.log(AddTerm)
        return this.http.post<selectedTerm>(this.apppointmentUrl, AddTerm);
    }
}