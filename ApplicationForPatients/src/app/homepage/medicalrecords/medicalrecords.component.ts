import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';
import { viewAppointmentService } from 'src/app/service/viewAppointments.service';
import { Appointment } from 'src/app/shared/appointment';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-medicalrecords',
  templateUrl: './medicalrecords.component.html',
  styleUrls: ['./medicalrecords.component.css']
})

export class MedicalrecordsComponent implements OnInit {

  public patient : any;
  public allAppoints : Appointment[] = [];
  public completedAppoints : Appointment[] = [];
  public awaitingAppoints : Appointment[] = [];
  public cancelledAppoints : Appointment[] = [];
  public token : any;
  public decoded : any;
  
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

    // Here we get username from JSON Web Token
    this.token = localStorage.getItem("jwt");
    this.decoded = jwt_decode(this.token?.toString()); 
    var username = this.decoded['sub'];
    
    // Here we get patient by username 
    this.patientService.getPatientByUserName(username).subscribe( response => { 
      this.patient = response;
    });
    
    this.appointmentService.getAll(this.patient.id).subscribe(res => {
      this.allAppoints = res;
    });
        
    this.appointmentService.getAwaiting(this.patient.id).subscribe(res => {
      this.awaitingAppoints = res;
    });
    
    this.appointmentService.getCancelled(this.patient.id).subscribe(res => {
      this.cancelledAppoints = res;
    });
    
    this.appointmentService.getAwaiting(this.patient.id).subscribe(res => {
      this.awaitingAppoints = res;
    });
    
    
  }

}


