import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  recepti: string;
}
@Component({
  selector: 'app-presciptions',
  templateUrl: './presciptions.component.html',
  styleUrls: ['./presciptions.component.css']
})
export class PresciptionsComponent {
  
  prescription: any = null;
  title: string = '';
  constructor(
    public dialogRef: MatDialogRef<PresciptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.prescription = data.recepti;
    this.title = data.title;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}