
import { Doctor } from "./doctor";
import { Patient } from "./patient";

export class FreeAppointment {

    id: number;
    startTime: Date;
    roomId: number;
    patientId: number;
    patient: Patient;
    doctorId: number;
    doctor: Doctor;
}
