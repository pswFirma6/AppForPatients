import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';
import { viewAppointmentService } from 'src/app/service/viewAppointments.service';
import { AppointmentService } from 'src/app/service/appointment';
import { Appointment } from 'src/app/shared/appointment';
import jwt_decode from 'jwt-decode';
import { MedicalRecord } from 'src/app/shared/medicalRecord';
import { MatDialog } from '@angular/material/dialog';
import { PresciptionsComponent } from 'src/app/presciptions/presciptions.component';


@Component({
  selector: 'app-medicalrecords',
  templateUrl: './medicalrecords.component.html',
  styleUrls: ['./medicalrecords.component.css']
})

export class MedicalrecordsComponent implements OnInit {
  public patient: MedicalRecord;
  public allAppoints: Appointment[] = [];
  public completedAppoints: Appointment[] = [];
  public awaitingAppoints: Appointment[] = [];
  public cancelledAppoints: Appointment[] = [];
  public token: any;
  public decoded: any;

  constructor(private patientService: PatientService, private viewAppointmentService: viewAppointmentService, public dialog: MatDialog, private appointmentService: AppointmentService) { }

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

      this.token = localStorage.getItem("jwt");
    this.decoded = jwt_decode(this.token?.toString()); 
    var username = this.decoded['sub'];
    
    // Here we get patient by username 
    this.patientService.getPatientByUserName(username).subscribe( response => { 
      this.patient = response;

      console.log(this.patient);

      // this.appointmentService.getAwaiting(this.patient.id).subscribe(res => {
      //   this.awaitingAppoints = res;
      // });

      // this.appointmentService.getCancelled(this.patient.id).subscribe(res => {
      //   this.cancelledAppoints = res;
      // });
      
      // this.appointmentService.getCompleted(this.patient.id).subscribe(res => {
      //   this.completedAppoints = res;
      // });
    });




  }


  openDialog(): void {
    const dialogRef = this.dialog.open(PresciptionsComponent, {
      height: '600px',
      width: '400px',
      data: {recepti: this.appointmentService.getPrescription},

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
}

