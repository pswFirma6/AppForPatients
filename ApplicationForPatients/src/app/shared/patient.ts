import { Allergy } from "./allergy";
import { Doctor } from "./doctor";

export class Patient {
    
    name:string ;
    surname:string;
    birthDate : Date;
    jmbg: string;
    address:string;
    phone:string;
    email:string;
    username:string;    
    password:string;    
    gender : string;     
    city:string;
    country:string;
    bloodType:string;
    rhFactor:string;
    height:number;    
    weight:number;       
    doctor : Doctor;
    picture: File;

    ;
}