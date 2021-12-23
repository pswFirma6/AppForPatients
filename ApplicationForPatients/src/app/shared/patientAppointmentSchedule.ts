import { Allergy } from "./allergy";

export class Patient {

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
}
