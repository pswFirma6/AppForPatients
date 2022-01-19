import { DoctorForReg } from "./doctorForReg";

export class Appointment {
    startTime: Date;
    patientId: number;
    doctor: DoctorForReg;
    surveyTaken : boolean;
    state : number;
    dateCancelled : Date;
}