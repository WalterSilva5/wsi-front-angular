import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { PrimeNGConfig } from 'primeng/api';
import { dateFormatTranslation } from './date-picker.translation';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CalendarModule]
})
export class DatePickerComponent {
  @Output() dateChange = new EventEmitter<{ datePicker: Date }>();
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private config: PrimeNGConfig
  ) {
    this.form = this.fb.group({
      datePicker: [new Date(), Validators.required]
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(values => {
      this.dateChange.emit({
        datePicker: values.datePicker,
      });
    });
    
    this.config.setTranslation(dateFormatTranslation);
  }
}