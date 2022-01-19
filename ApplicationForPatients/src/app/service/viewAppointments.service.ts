import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "../global";
import { Appointment } from "../shared/appointment";


@Injectable({
    providedIn: 'root',
})
export class viewAppointmentService {
    allAppointmentsUrl = GlobalSettings.baseUrl + "/api/Appointment";
    completedAppointmentsUrl = GlobalSettings.baseUrl + "/api/Appointment/completed";
    awaitingAppointmentsUrl = GlobalSettings.baseUrl + "/api/Appointment/awaiting";
    cancelledAppointmentsUrl = GlobalSettings.baseUrl + "/api/Appointment/cancelled";

    constructor(private http: HttpClient){ }

    public getCompleted(id: number): Observable<Appointment[]>{
        
        return this.http.get<Appointment[]>(this.completedAppointmentsUrl +"/" +id);
    }
    public getAwaiting(id: number): Observable<Appointment[]>{
        console.log("aaa");
        return this.http.get<Appointment[]>(this.awaitingAppointmentsUrl +"/" +id);
    }
    public getCancelled(id: number): Observable<Appointment[]>{
        
        return this.http.get<Appointment[]>(this.cancelledAppointmentsUrl +"/" +id);
    }
    
    
}