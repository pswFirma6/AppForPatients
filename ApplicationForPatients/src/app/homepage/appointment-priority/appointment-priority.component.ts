import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppointmentPriorityService } from 'src/app/service/appointmentPriority.service';
import { freeTerms, freeTermsList, selectedTerm } from 'src/app/shared/appointmentPriority';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-priority',
  templateUrl: './appointment-priority.component.html',
  styleUrls: ['./appointment-priority.component.css'],
  providers: [DatePipe]
})
export class AppointmentPriorityComponent implements OnInit {
  public searchClicked: boolean = false;

  public displayList: freeTerms = {} as freeTerms;
  public allFreeTerms: freeTermsList = {} as freeTermsList;
  public freeTerms: freeTerms = {} as freeTerms;
  public displayDoctors: any[] = [];
  
  public selectedDate: Date = {} as Date;
  public selectedPriority: string = "doctor";
  public selectedDoctor: number = 0;
  public selectedType: string = "";

  public sendSelectedDate: Date = {} as Date;
  public sendSelectedTime: String = "";
  public sendSelectedDoctorId: number;

  public allTypes: any[] = [];
  public doctorType: Record<string, string> = {};
  public doctors: any[] = [];
  constructor(private appointmentPriorityService: AppointmentPriorityService, private router: Router, private DatePipe: DatePipe) {
      this.allTypes = [
        'allergy_and_immunology',
        'anesthesiology',
        'dermatology',
        'diagnostic_radiology',
        'emergency_medicine',
        'family_medicine',
        'internal_medicine',
        'medical_genetics',
        'neurology',
        'nuclear_medicine',
        'obstetrics_and_gynecology',
        'ophthalmology',
        'pathology',
        'pediatrics',
        'physical_medicine_and_rehabilitation',
        'preventive_medicine',
        'psychiatry',
        'radiation_oncology',
        'surgery',
        'urology',
        'generalPractitioner'
      ]

      this.doctorType = {
        0:'allergy_and_immunology',
        1:'anesthesiology',
        2:'dermatology',
        3:'diagnostic_radiology',
        4:'emergency_medicine',
        5:'family_medicine',
        6:'internal_medicine',
        7:'medical_genetics',
        8:'neurology',
        9:'nuclear_medicine',
        10:'obstetrics_and_gynecology',
        11:'ophthalmology',
        12:'pathology',
        13:'pediatrics',
        14:'physical_medicine_and_rehabilitation',
        15:'preventive_medicine',
        16:'psychiatry',
        17:'radiation_oncology',
        18:'surgery',
        19:'urology',
        20:'generalPractitioner'
      }

      this.selectedType = this.allTypes[this.allTypes.length-1]
   }

  ngOnInit(): void {
      this.appointmentPriorityService.getDoctors().subscribe(res => {
        this.doctors = res;
      });
  }

  TypeChange(){
    this.displayDoctors = [];
    for(let i=0; i<this.doctors.length; i++){
      if(this.selectedType == this.doctorType[this.doctors[i].doctorType]){
        this.displayDoctors.push(this.doctors[i])
      }
    }
  }

  SearchTerms(){
    this.appointmentPriorityService.searchTerms(
      this.selectedDate, this.selectedDoctor, this.selectedPriority)
      .subscribe(res => {
        this.allFreeTerms = res
        console.log(this.allFreeTerms)
      });
      this.searchClicked = true;

    this.EmptyFormElements();
  }

  private EmptyFormElements() {
    this.freeTerms = {} as freeTerms;
    this.selectedDoctor = 0;
    this.selectedType = "";
    this.selectedDate = {} as Date;

    this.sendSelectedDate = {} as Date;
    this.sendSelectedDoctorId = 0;
    this.sendSelectedTime = "";
  }

  SubmitTerm(){
    
    let date = this.sendSelectedTime + ' ' + this.DatePipe.transform(this.sendSelectedDate, 'MM/dd/yyyy');
    this.appointmentPriorityService.AddAppointment(date, 1, this.sendSelectedDoctorId)
    .subscribe(res => {
      console.log(res)
      this.router.navigate(['/medicalrecords']);

    });
  }

  InsertValues(time: String, date: Date, doctorId: number){
    this.sendSelectedDate = date;
    this.sendSelectedTime = time;
    this.sendSelectedDoctorId = doctorId;
    console.log('term: ' + this.sendSelectedDate + ' ' + this.sendSelectedTime + ' ' + this.sendSelectedDoctorId)
  }

  RequestValidation(): boolean{
    if(Object.keys(this.selectedDate).length === 0 || this.selectedType=="" || this.selectedDoctor==0){
      return false;
    }
    return true;
  }

  AddTermValidation(): boolean{
    if(Object.keys(this.sendSelectedDate).length === 0 || this.sendSelectedDoctorId==0 || this.sendSelectedTime==""){
      return false;
    }
    return true;
  }
}