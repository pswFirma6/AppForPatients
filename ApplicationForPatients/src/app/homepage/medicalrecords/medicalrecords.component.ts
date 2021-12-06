import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-medicalrecords',
  templateUrl: './medicalrecords.component.html',
  styleUrls: ['./medicalrecords.component.css']
})

export class MedicalrecordsComponent implements OnInit {

  public patient :any=[];

  constructor(private patientService:PatientService) { }

  ngOnInit(): void {
    this.patientService.getPatient("5").subscribe((
      data:{})=>
       {
        this.patient = data;
        
    });
    
  }

}
