import { Byte } from "@angular/compiler/src/util";
import { Allergy } from "./allergy";

export class Registration {

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
    userType: number;
    bloodType: string;
    rhfactor: string;
    height: number;
    weight: number;
    allergies: Allergy[];
    doctorId: number;
    picture: File;
}
