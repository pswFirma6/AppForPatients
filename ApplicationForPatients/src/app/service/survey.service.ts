import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "../global";
import { Survey } from "../shared/survey";

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
        return this.http.post<Survey[]>(this.surveyUrl + "/TakeSurvey", survey);
    }
}