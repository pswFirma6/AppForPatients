import { Component, ElementRef, OnDestroy, Input, OnInit, ViewChild } from '@angular/core';
import Stepper from 'bs-stepper';
import {NgbDateStruct, NgbCalendar, NgbTypeahead, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/service/doctor.service';
import { DoctorType } from 'src/app/shared/enum/EdoctorType';
import { AppointmentService } from 'src/app/service/appointment';
import { FreeTerms } from 'src/app/shared/free-term';
import { Term } from 'src/app/shared/term';
import { NotificationService } from 'src/app/service/notification_service/notification.service';
import { Router } from '@angular/router';
import { AppointmentSchedule } from 'src/app/shared/appointmentSchedule';
import { Doctor } from 'src/app/shared/doctor';
import { PatientService } from 'src/app/service/patient.service';
import { PatientJWT } from 'src/app/shared/patientJWT';
import jwt_decode from 'jwt-decode';
import { EventService } from 'src/app/service/event/event.service';
import { EventAppointment } from 'src/app/shared/events/EventNewAppointment';
import { StepEvent } from 'src/app/shared/events/StepEvent';
import { DatePickerComponent } from '../date-picker/date-picker.component';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})

export class NewAppointmentComponent implements OnInit, OnDestroy {

  name = 'Angular';
  private stepper: Stepper;

  modelSpeciality: any;
  date: Date;
  headerRow: string[];
  dataRows: string[][]; 
  appointmentForm: AppointmentSchedule;
  doctorType: string;
  doctors: Doctor[];
  selectedDoctor: Doctor;
  selectedFreeTerm: Date;
  selectedDoctorId: number;
  tableData: any;
  freeTerms: FreeTerms;
  term: Term;
  clicked: boolean = true;
  token: any;
  decoded: any;
  patient: PatientJWT;
  public tableData2: any;
  eventAppointment: EventAppointment;
  startTime: any;
  endTime: any;
  stepEvent: StepEvent;
  step: any;
  appointmentCreated: boolean;
  previousEvent: StepEvent;
  endTimeInnerEvent: any;
  startTimeInnerEvent: any;
  checkDate: boolean = true;

  //isDisabled: any; 

  constructor(private calendar: NgbCalendar, private formBuilder: FormBuilder, 
            private notifyService : NotificationService, private doctorService : DoctorService, 
            private appointmentService : AppointmentService, private router: Router,
            private patientService : PatientService, private eventService : EventService,
            private elementRef:ElementRef, private datePicker: DatePickerComponent) {
          
  }
  
  ngAfterViewInit() {
    
    this.stepEvent = new StepEvent();

    this.elementRef.nativeElement.querySelector('#stepper1')
      .addEventListener('shown.bs-stepper', (event: any) => {
        this.triggerEventForStep(event.detail.indexStep);
      })

  }

  triggerEventForStep(step:any){

    //prvi ulaz
    if(this.previousEvent === undefined){
      this.stepEvent.applicationName = "AppForPatient";
      this.stepEvent.clickTime = new Date();
      this.startTimeInnerEvent = performance.now();
      this.setStepEventName(step);
      this.previousEvent = new StepEvent();
    } else {
      this.previousEvent = new StepEvent();
      this.previousEvent.applicationName = this.stepEvent.applicationName;
      this.previousEvent.name = this.stepEvent.name;
      this.previousEvent.clickTime = this.stepEvent.clickTime;
      
      this.endTimeInnerEvent = performance.now();
      var number = Number(this.endTimeInnerEvent - this.startTimeInnerEvent);
      this.previousEvent.timeSpan = number;
      
      this.eventAppointment.eventsStep.push(this.previousEvent);

      this.stepEvent = new StepEvent();
      this.stepEvent.applicationName = "AppForPatient";
      
      this.endTimeInnerEvent = 0;
      this.startTimeInnerEvent = performance.now();
      this.stepEvent.clickTime = new Date();
      this.setStepEventName(step);

    }

  }

  setStepEventName(step: any){
    if(step === 0) {
      this.stepEvent.name = 'Date';
    } else if (step === 1) {
      this.stepEvent.name = 'Speciality';
    } else if (step === 2) {
      this.stepEvent.name = 'Doctor';
    } else {
      this.stepEvent.name = 'Term';
    }  
  }


  ngOnDestroy(): void {
    this.submitAppointmentEvent();
  }

  submitAppointmentEvent(){

    if(this.stepEvent !== undefined){
      this.endTimeInnerEvent = performance.now();
      var number = Number(this.endTimeInnerEvent - this.startTimeInnerEvent);
      this.stepEvent.timeSpan = number;
      this.eventAppointment.eventsStep.push(this.stepEvent);
    }

    this.endTime = performance.now();
    var number = Number(this.endTime - this.startTime);
    this.eventAppointment.timeSpan = number;
    this.eventAppointment.appointmentCreated = this.appointmentCreated;
    this.eventService.AddAppointmentEvent(this.eventAppointment).subscribe( response => { });

  }

  ngOnInit() {
    
    // Here we get username from JSON Web Token
    this.token = localStorage.getItem("jwt");
    this.decoded = jwt_decode(this.token?.toString()); 
    var username = this.decoded['sub'];
    
    // Here we get patient by username 
    this.patientService.getPatientByUserName(username).subscribe( response => { 
      this.patient = response;
    });
    
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
    
    this.stepEvent = new StepEvent;
    this.eventAppointment = new EventAppointment;
    this.eventAppointment.eventsStep = [];
    this.eventAppointment.name = 'New appointment in four steps';
    this.eventAppointment.applicationName = 'AppForPatient';
    this.eventAppointment.clickTime = new Date();
    this.startTime = performance.now();

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
      this.eventAppointment.doctorId = doctor.id;
      this.term.doctorId = doctor.id;
      this.term.startDate = this.date;

      this.appointmentService.getAvailableDoctors(this.term).subscribe( res => {
        this.freeTerms = res;
  
      })

  }

  setDate(event: Date): void {
    this.date = event;
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


  submit(){

    this.appointmentForm = new AppointmentSchedule();
    this.appointmentForm.doctorId = this.selectedDoctor.id;
    // Here we set patient Id to new feedback
    this.appointmentForm.patientId = this.patient.id;

    this.appointmentForm.startTime = this.selectedFreeTerm;
   
    this.appointmentService.addNewAppointment(this.appointmentForm).subscribe( (response) => {
      this.showToasterSuccess();
      this.appointmentCreated = true;
      setTimeout(() => this.router.navigate(['/patient/medicalrecords']), 500);
    });
    
  }

  showToasterSuccess(){
    this.notifyService.showSuccess("The appointment has been added!", "Success!")
  }
 
  showToasterError(){
    this.notifyService.showError("You need to complete the form! ", "Error!")
  }

}

