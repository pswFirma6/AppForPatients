import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "../global";
import { Patient } from "../models/patient";

@Injectable({
    providedIn: 'root',
})
export class PatientService {
    patientUrl = GlobalSettings.baseUrl + "/api/Patient";

    constructor(private http: HttpClient){ }

    public getPatient(id: string): Observable<Patient>{
        
        return this.http.get<Patient>(this.patientUrl +"/" +id);
    }

    
}