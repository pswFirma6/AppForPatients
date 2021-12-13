import { DoctorForReg } from "./doctorForReg";

export class Appointment {
    date: Date;
    doctor: DoctorForReg;
    surveyTaken : boolean;
    state : number;
}