import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { GlobalSettings } from "../global";
import { Allergy } from "../shared/allergy";

@Injectable({
    providedIn: 'root',
  })
  export class AllergyService {
      
      allergyUrl = GlobalSettings.baseUrl + "/api/Allergy";
  
      constructor(private http: HttpClient) { }
    
      public getAllergies(): Observable<Allergy[]>{
        return this.http.get<Allergy[]>(this.allergyUrl);
      }



      handleError(error: any) {

        let errorMessage = '';
     
        if (error.error instanceof ErrorEvent) {
     
          // client-side error
        
          errorMessage = `Error: ${error.error.message} `;
     
        } else {
     
          // server-side error
     
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     
        }
     
        window.alert(errorMessage);
     
        return throwError(errorMessage);
     
      }

}
