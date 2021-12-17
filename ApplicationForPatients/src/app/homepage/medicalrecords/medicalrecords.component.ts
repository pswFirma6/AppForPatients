import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/shared/patient';
import { PatientService } from 'src/app/service/patient.service';
import { viewAppointmentService } from 'src/app/service/viewAppointments.service';
import { Appointment } from 'src/app/shared/appointment';

@Component({
  selector: 'app-medicalrecords',
  templateUrl: './medicalrecords.component.html',
  styleUrls: ['./medicalrecords.component.css']
})

export class MedicalrecordsComponent implements OnInit {

  public patient :any=[];
  public allAppoints : Appointment[] = [];
  public completedAppoints : Appointment[] = [];
  public awaitingAppoints : Appointment[] = [];
  public cancelledAppoints : Appointment[] = [];
  
  
  constructor(private patientService:PatientService , private appointmentService : viewAppointmentService) { }
/*
  public cancelAppointment(appointment: Appointment): boolean {
    this.appointmentService.cancelAppointment(appointment.date)
    .subscribe(response => {
      appointment.state = FeedbackState.rejected;
      return true;
    });
    return false;
  }
  */
  ngOnInit(): void {
    this.patientService.getPatient(1).subscribe((
      data:{})=>
       {
        this.patient = data;
        
    });
    
    this.appointmentService.getAll(1).subscribe(res => {
      this.allAppoints = res;
    });
        
    this.appointmentService.getAwaiting(1).subscribe(res => {
      this.awaitingAppoints = res;
    });
    
    this.appointmentService.getCancelled(1).subscribe(res => {
      this.cancelledAppoints = res;
    });
    
    this.appointmentService.getAwaiting(1).subscribe(res => {
      this.awaitingAppoints = res;
    });
    
    
  }

}
