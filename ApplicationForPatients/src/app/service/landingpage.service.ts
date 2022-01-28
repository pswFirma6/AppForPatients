import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "../global";
import { freeTerms, freeTermsList, selectedTerm } from "../shared/appointmentPriority";


@Injectable({
    providedIn: 'root',
})
export class LandingpageService {
    adsUrl =  GlobalSettings.baseUrl + "/api/ads";
    constructor(private http: HttpClient){ }

    public getAds(): Observable<any[]>{
        return this.http.get<any[]>(this.adsUrl);
    }
}