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
        return this.http.get<Survey[]>(this.surveyUrl);
    }

    public addSurvey(survey: Survey[]): Observable<Survey[]>{
        for(let s of survey){
            s.rate = Number(s.rate)
        }
        var surveyObj = {
            "personId": "1",
            "surveyQuestions": survey
        } 
        console.log(surveyObj)
        return this.http.post<Survey[]>(this.surveyUrl, surveyObj);
    }
}