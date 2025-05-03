import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ViewWrapperComponent } from '../view-wrapper/view-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { FormUtil } from '../../utils/form.util';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InputTextarea } from 'primeng/inputtextarea';

@Component({
  selector: 'app-form-view',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,

    CalendarModule,
    InputTextarea,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    FloatLabelModule,

    ViewWrapperComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add this line
  templateUrl: './form-view.component.html',
  styleUrl: './form-view.component.scss'
})
export class FormViewComponent {

  form = new FormGroup({
    date: new FormControl(this.getIitialDate(), Validators.required),
    email: new FormControl('', Validators.required),
    contact: new FormControl(''),
    details: new FormControl(''),
  })

  // TODO tlumaczenia w kalendarzu

  // TODO wyklucz weekendy
  disabledDates: Date[] = []

  _submit() {
    console.log(this.form.value)
    if (this.form.invalid) {
      FormUtil.markForm(this.form)
      return
    }
    // this.courtine.startCourtine()
    console.log('TODO send')
    // this.courtine.stopCourtine()
  }
  
  private getIitialDate(): Date {
    const result = new Date()
    result.setDate(result.getDate() + 5)
    return result
  }


}
