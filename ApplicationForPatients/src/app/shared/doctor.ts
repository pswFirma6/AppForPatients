import { Appointment } from "./appointment";
import { Patient } from "./patient";

export class Doctor {

    id: number;
    name: string;
    surname: string;
    birthDate: Date;
    jmbg: string;
    address: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    gender: string;
    city: string;
    country: string;
    userType: string;
    patients: Patient[];
    doctorType: string;
    appointments: Appointment[];
}