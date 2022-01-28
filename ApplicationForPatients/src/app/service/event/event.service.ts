import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "src/app/global";
import { EventAppointment } from "src/app/shared/events/EventNewAppointment";
import { StepEvent } from "src/app/shared/events/StepEvent";


@Injectable({
    providedIn: 'root',
  })
  export class EventService {
      
      eventUrl = GlobalSettings.baseUrl + "/api/Event";
  
      constructor(private http: HttpClient) { }
    
      public AddAppointmentEvent(eventAppointment: EventAppointment): Observable<any>{
        return this.http.post<any>(this.eventUrl + '/addEvent', eventAppointment);
      }

      public AddStepEvent(eventStep: StepEvent): Observable<any>{
        return this.http.post<any>(this.eventUrl + '/addEventStep', eventStep);
      }

}
