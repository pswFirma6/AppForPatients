import { Allergy } from "./allergy";
import { Doctor } from "./doctor";

export class MedicalRecord {
    
    id: number;
    name: string;
    surname: string;
    birthDate: Date;
    jmbg: string;
    address: string;
    phone: string;
    username: string;
    password: string;
    gender: string;
    city: string;
    country: string;
    userType: string;
    bloodType: string;
    rhfactor: string;
    height: number;
    weight: number;
    allergies: Allergy[];
    doctorId: number;
    picture: File;
    
}