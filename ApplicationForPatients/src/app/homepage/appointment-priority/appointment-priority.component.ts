import { Component, OnInit } from '@angular/core';
import { AppointmentPriorityService } from 'src/app/service/appointmentPriority.service';
import { appointmentPriority } from 'src/app/shared/appointmentPriority';

@Component({
  selector: 'app-appointment-priority',
  templateUrl: './appointment-priority.component.html',
  styleUrls: ['./appointment-priority.component.css']
})
export class AppointmentPriorityComponent implements OnInit {
  public searchClicked: boolean = false;
  public displayList: appointmentPriority;
  public freeTerms: appointmentPriority;
  public displayDoctors: any[] = [];
  public selectedDate: Date;
  public selectedPriority: string = "doctor";
  public selectedDoctor: string;
  public selectedType: string;
  public allTypes: any[] = [];
  public doctorType: Record<string, string> = {};
  public doctors: any[] = [];
  constructor(private appointmentPriorityService: AppointmentPriorityService) {
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
    console.log(this.selectedType)
    for(let i=0; i<this.doctors.length; i++){
      if(this.selectedType == this.doctorType[this.doctors[i].doctorType]){
        this.displayDoctors.push(this.doctors[i])
      }
    }
    this.selectedDoctor = this.displayDoctors[0]
  }

  SearchTerms(){
    console.log(this.selectedDate)
    this.appointmentPriorityService.searchTerms(
      this.selectedDate, this.selectedDoctor, this.selectedPriority)
      .subscribe(res => {
        this.freeTerms = res
        console.log(this.freeTerms)
        console.log(this.freeTerms.terms)
      });
      this.searchClicked = true;
  }
}