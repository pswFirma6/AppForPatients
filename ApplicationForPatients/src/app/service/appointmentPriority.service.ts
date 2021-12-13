import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "../global";
import { appointmentPriority, selectedTerm } from "../shared/appointmentPriority";


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

    public searchTerms(date: Date, doctor: string, priority: string): Observable<appointmentPriority>{
        let request = {
            date: date.toString(), 
            doctorId: doctor, 
            priority: priority
        }
        console.log(request)
        return this.http.post<appointmentPriority>(this.apppointmentUrl + "/priority", request);
    }

    public AddAppointment(date: string, patientId: number, doctorId: string): Observable<selectedTerm>{
        let AddTerm = {
            startTime: date,
            patientId: patientId,
            doctorId: doctorId
          }
        console.log(AddTerm)
        return this.http.post<selectedTerm>(this.apppointmentUrl, AddTerm);
    }
    // public addSurvey(survey: Survey[]): Observable<Survey[]>{
    //     for(let s of survey){
    //         s.rate = Number(s.rate)
    //         s.personId = "1"
    //     }
    //     return this.http.post<Survey[]>(this.surveyUrl + "/TakeSurvey", survey);
    // }
}