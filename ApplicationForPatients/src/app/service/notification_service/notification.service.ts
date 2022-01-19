import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
   
import { ToastrService } from 'ngx-toastr';
   
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    
    constructor(private toastr: ToastrService) { }
    
    showSuccess(message: any, title: any){
        this.toastr.success(message, title)
    }
    
    showError(message: any, title: any){
        this.toastr.error(message, title, {timeOut: 10000})
    }
    
    showInfo(message: any, title: any){
        this.toastr.info(message, title)
    }
    
    showWarning(message: any, title: any){
        this.toastr.warning(message, title)
    }
    
}