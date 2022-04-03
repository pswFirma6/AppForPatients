import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {NgbDateStruct, NgbCalendar, NgbTypeahead, NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css']
})
  
export class DatePickerComponent implements OnInit {
    date: Date;

    displayMonths = 4;
    navigation = 'select';
    showWeekNumbers = false;
    outsideDays = 'visible';
    model: NgbDateStruct;
    today: any;
    
    selectedFreeTerm: any;
    clicked: boolean;

    @Output() dateEmit = new EventEmitter<Date>();

    ngOnInit(): void {
        
    this.today = { year: new Date().getFullYear(),
        month: new Date().getMonth() + 1, 
        day: new Date().getDay() };
    }

    setTerm(term: any): void {
        this.selectedFreeTerm = term;
        this.clicked = false;
    }
    
    setDate(date: NgbDate){
        this.date = new Date(date.year, date.month - 1, date.day); 
        this.checkDate = false;
        this.dateEmit.emit(this.date);
    }

    setTime(time: any){
        var timeTokens = time.split(':');
        
        var d = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getMonth());
        this.date.setHours(timeTokens[0]);
        this.date.setMinutes(timeTokens[1]);
    }
}