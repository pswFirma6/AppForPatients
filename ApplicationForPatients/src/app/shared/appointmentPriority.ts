import { Doctor } from "./doctor";


export class freeTermsList{
    freeTermsList: freeTerms[];
}

export class freeTerms{
    date: Date;
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