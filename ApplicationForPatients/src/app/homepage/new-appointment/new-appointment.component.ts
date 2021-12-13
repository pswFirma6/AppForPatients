import { Component, OnInit, ViewChild } from '@angular/core';
import Stepper from 'bs-stepper';
import {NgbDateStruct, NgbCalendar, NgbTypeahead, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'src/app/shared/appointment';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/service/doctor.service';
import { Doctor } from 'src/app/shared/doctor';
import { DoctorType } from 'src/app/shared/enum/EdoctorType';
import { AppointmentService } from 'src/app/service/appointment';
import { FreeTerms } from 'src/app/shared/free-term';
import { Term } from 'src/app/shared/term';
import { NotificationService } from 'src/app/service/notification_service/notification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})

export class NewAppointmentComponent implements OnInit {

  name = 'Angular';
  private stepper: Stepper;
  model: NgbDateStruct;
  date: Date;

  displayMonths = 4;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';

  modelSpeciality: any;

  headerRow: string[];
  dataRows: string[][]; 
  appointmentForm: Appointment;
  doctorType: string;
  doctors: Doctor[];
  selectedDoctor: Doctor;
  selectedFreeTerm: Date;
  selectedDoctorId: number;
  tableData: any;
  freeTerms: FreeTerms;
  term: Term;
  clicked: boolean = true;
  checkDate: boolean = true;
  today: any;
  //isDisabled: any; 
 

  constructor(private calendar: NgbCalendar, private formBuilder: FormBuilder, 
            private notifyService : NotificationService, private doctorService : DoctorService, 
            private appointmentService : AppointmentService, private router: Router) {
          
  }


  public tableData2: any;

  ngOnInit() {
    /*
    let stringToSplit = new Date().toString();
    let x = stringToSplit.split(" ");
    console.log(x[2]);
    */
    this.today = { year: new Date().getFullYear(),
                   month: new Date().getMonth() + 1, 
                   day: new Date().getDay() };
    /*
    this.isDisabled = (date: NgbDate, current: {month : number}) => date.day <= +x[2] ;        
    console.log(new Date());
    */
    this.tableData = {
      headerRow: [ 'Name',  'Surname', 'City', 'Speciality' ]
    }  

    this.doctors = [];
    this.freeTerms = new FreeTerms;
    this.term = new Term;

    this.stepper = new Stepper(document.querySelector('#stepper1')!, {
      linear: false,
      animation: true
    })

    this.tableData2 = {
      headerRow: [ 'Date', 'Time' ]
    }
  }

  public get doctorTypeEnum(): typeof DoctorType {
    return DoctorType; 
  }

 

  getFreeDoctorTerms(doctor: Doctor): void {
      
      this.selectedDoctor = doctor;
      this.term.doctorId = doctor.id;
      this.term.startDate = this.date;

      this.appointmentService.getAvailableDoctors(this.term).subscribe( res => {
        this.freeTerms = res;
  
      })

  }

  setTerm(term: any): void {
    this.selectedFreeTerm = term;
    this.clicked = false;
  }

  public onChangeSpeciality(event: Event): void {    
    this.doctorService.getDoctorsWithSpec(this.doctorType).subscribe( res => {  
      this.doctors = res;
    });
  }

  public onChangeDoctor(event: any): void {    
    this.selectedDoctorId = event;
  }


  /** Select Date **/
  next() {
    this.stepper.next();
  }

  back() {
    this.stepper.previous();
  }

  setDate(date: NgbDate){
    this.date = new Date(date.year, date.month - 1, date.day); 
    this.checkDate = false;
  }

  setTime(time: any){
    var timeTokens = time.split(':');
    
    var d = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getMonth());
    this.date.setHours(timeTokens[0]);
    this.date.setMinutes(timeTokens[1]);
  }

  submit(){

    this.appointmentForm = new Appointment();
    this.appointmentForm.doctorId = this.selectedDoctor.id;
    this.appointmentForm.patientId = 1;
    this.appointmentForm.startTime = this.selectedFreeTerm;
   

    this.appointmentService.addNewAppointment(this.appointmentForm).subscribe( (response) => {
     
      this.showToasterSuccess()
      setTimeout(() => this.router.navigate(['/patient/medicalrecords']), 500);
    })
    
  }

  showToasterSuccess(){
    this.notifyService.showSuccess("The appointment has been added!", "Success!")
  }
 
  showToasterError(){
    this.notifyService.showError("You need to complete the form! ", "Error!")
  }

}

