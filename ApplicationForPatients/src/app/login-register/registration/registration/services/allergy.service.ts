import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "src/app/global";
import { Allergy } from "src/app/shared/allergy";


@Injectable({
    providedIn: 'root',
  })
  export class AllergyService {
      
      allergyUrl = GlobalSettings.baseUrl + "/api/Allergy";
  
      constructor(private http: HttpClient) { }
    
      public getAllergies(): Observable<Allergy[]>{
        return this.http.get<Allergy[]>(this.allergyUrl);
      }

}
