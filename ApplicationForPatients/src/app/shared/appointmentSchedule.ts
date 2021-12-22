import { Doctor } from "./doctor";
import { Patient } from "./patient";

export class AppointmentSchedule {

    startTime: Date; 
    patientId: number;
    patient: Patient; 
    doctorId: number; 
    doctor: Doctor; 
}