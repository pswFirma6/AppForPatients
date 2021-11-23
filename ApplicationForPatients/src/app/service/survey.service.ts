import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "../global";
import { Survey } from "../models/survey";

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    surveyUrl = GlobalSettings.baseUrl + "/api/Survey";

    constructor(private http: HttpClient){ }

    public initializeSurvey(): Observable<Survey[]>{
        return this.http.get<Survey[]>(this.surveyUrl + "/InitializeSurvey");
    }

    public addSurvey(survey: Survey[]): Observable<Survey[]>{
        for(let s of survey){
            s.rate = Number(s.rate)
            s.personId = "1"
        }
        return this.http.post<Survey[]>(this.surveyUrl + "/TakeSurvey", survey);
    }
}