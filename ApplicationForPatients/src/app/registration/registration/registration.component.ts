import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AllergyService } from 'src/app/service/allergy.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { NotificationService } from 'src/app/service/notification_service/notification.service';
import { Allergy} from 'src/app/shared/allergy';
import { DoctorForReg } from 'src/app/shared/doctorForReg';
import {Router} from "@angular/router"
import { Registration } from 'src/app/shared/registration';
import { RegistrationService } from 'src/app/service/registration.service';
import { invalid } from '@angular/compiler/src/render3/view/util';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  defaultUrl = "assets/img/default-avatar.png";
  picture = '';
  picture2: any;
  imageUrl = this.defaultUrl;
  imageToUpload = null;

  doctors: DoctorForReg[];
  allergies : Allergy [];
  addedAllergies: Allergy [];

  closeModal: string;
  chosenDoctor: DoctorForReg;
  regForm: any;
  patient: Registration;

  constructor(private modalService: NgbModal, private notifyService : NotificationService,
     private doctorService : DoctorService, private allergyService : AllergyService, 
     private formBuilder: FormBuilder, private router: Router, private patientService: RegistrationService) { }


  ngOnInit(): void {
    this.addedAllergies = [];
    this.chosenDoctor = new DoctorForReg();
    this.getAllergies();
    this.getAvailableDoctors();
    this.patient = new Registration;

    this.regForm = this.formBuilder.group({
      name: new FormControl("", [ Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      surname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      birthDate: new FormControl('', [Validators.required]),
      jmbg: new FormControl('', [Validators.required, Validators.pattern('[()0-9]+'), Validators.minLength(13), Validators.maxLength(13)]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      retypePassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      country: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      bloodType: new FormControl('', [Validators.required]),
      rhfactor: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required, Validators.pattern('[()0-9]+'), Validators.maxLength(3), Validators.minLength(2)]),
      weight: new FormControl('', [Validators.required, Validators.pattern('[()0-9]+'), Validators.maxLength(3), Validators.minLength(2)]),
      allergies: new FormControl( [[]]),
      doctor: new FormControl( [this.chosenDoctor, [Validators.required]]),
      picture: new FormControl('',[Validators.required]),
    });
  }
  
  register() {
    if(this.regForm.valid) {
      
      this.patient = this.regForm.value as Registration;
      if(!this.chosenDoctor){
        this.showToasterError();
      }
      this.patient.doctorId = this.chosenDoctor.id;
      this.patient.allergies = this.addedAllergies;
      //console.log(this.patient)
      this.patient.picture = this.picture2;
      this.patient.userType = 1;
      this.patientService.sendRegistration(this.patient).subscribe((response) => {
        this.showToasterSuccess()
        setTimeout(() => this.router.navigate(['/landingpage']), 1000);
      }, error => {
        console.log(error);
        if(error.status === 400)
          this.showToasterWarning();
        else if(error.status == 409)
          this.showToasterInfo();
    });
        
    } else {
        this.showToasterError();
    }
  }



  getAvailableDoctors()  {
    this.doctorService.getAvailableDoctors().subscribe(res => {
      this.doctors = res;
    });
  }
  

  addDoctor(doctor: DoctorForReg) {
    this.chosenDoctor = doctor;
  }

  getAllergies() {
    this.allergyService.getAllergies().subscribe(res => {
      this.allergies = res;
    })
  }

  addAllergy(allergy: Allergy) {
    this.addedAllergies.push(allergy);
    this.removeElementFromAllergies(allergy);
  }


  removeElementFromAllergies(element: Allergy) {
    this.allergies.forEach((value,index)=>{
        if(value==element) this.allergies.splice(index,1);
    });
  }

  restartAllergies(element: Allergy) {
    this.allergies.push(element);
    this.addedAllergies.forEach((value,index)=>{
        if(value==element) this.addedAllergies.splice(index,1);
    });
  }

  triggerModal(content: any) {
    this.modalService.open(content, { scrollable: true }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  showToasterSuccess(){
    this.notifyService.showSuccess("Email will be sent soon!", "Success!")
  }
 
  showToasterError(){
    this.notifyService.showError("You did't complete the form well! ", "Error!")
  }

  onFileChanged(event: any) {
    if(!event.target.files.item(0).type.includes('image')){
      this.imageUrl = this.defaultUrl
      return;
    }
    if(event.target.files){
      this.regForm.picture = event.target.result

      var binReader = new FileReader();
      binReader.readAsBinaryString(event.target.files[0]);
      binReader.onload = (event: any) =>{
        this.regForm.picture = btoa(event.target.result);
        this.picture2 = btoa(event.target.result);
         console.log(this.regForm.picture);
         //console.log(btoa(event.target.result));
      }

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event: any) =>{
        this.imageUrl = event.target.result
        // console.log(this.imageUrl)
      }
    }
  }

  showToasterWarning(){
    this.notifyService.showWarning("Username must be more than 5 alphanumeric characters! \n Password must be more than 8 alphanumeric characters!", "Warrning!")
  }

  showToasterInfo(){
    this.notifyService.showInfo("User with this username, UMCN or email already exists! ", "Info!");
  }


}
