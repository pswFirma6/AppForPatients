import { Doctor } from "./Doctor"

export class appointmentPriority{
    date: string;
    doctorId: number;
    doctor: Doctor;
    terms: string[];
}

export class selectedTerm{
    startTime: Date;
    patientId: number;
    doctorId: number;
    doctor: Doctor;
}