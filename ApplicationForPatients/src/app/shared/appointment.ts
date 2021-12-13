import { Doctor } from "./doctor";
import { Patient } from "./patient";

export class Appointment {

    startTime: Date; 
    patientId: number;
    patient: Patient; 
    doctorId: number; 
    doctor: Doctor; 

}