import { Component } from '@angular/core';
import { ViewWrapperComponent } from '../view-wrapper/view-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormUtil } from '../../utils/form.util';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { DateUtil } from '../../utils/date-util';

@Component({
  standalone: true,
  selector: 'app-form-view',
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
      
    DatePickerModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,

    ViewWrapperComponent,
  ],
  templateUrl: './form-view.component.html',
  styleUrl: './form-view.component.scss'
})
export class FormViewComponent {

  private readonly env = environment.email;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl(this.getIitialDate(), Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl(''),
    details: new FormControl(''),
  })

  // TODO dynamiczne tlumaczenia w kalendarzu
  // TODO file upload https://primeng.org/fileupload
  // TODO wyklucz weekendy i zaklepane dni
  // TODO labelka i kontrolka owrapowac 
  // TODO errory 
  // TODO kurtyna 
  // TODO toast 
  disabledDates: Date[] = []

  _submit(event?: Event) {
    if (this.form.invalid) {
      FormUtil.markForm(this.form)
      return
    }
    this.send()
    // this.courtine.startCourtine()
    console.log('TODO send')
    // this.courtine.stopCourtine()
  }

  private async send() {
    const now = new Date()
    const templateParams: Record<string, string> = {
      name: this.form.value.name!,
      date: DateUtil.formatDDMMYYYY(this.form.value.date!),
      time: `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`,
      email: this.form.value.email!,
      details: this.form.value.details!
    }
    console.log(templateParams)
    const result = await emailjs.send(
      this.env.serviceId,
      this.env.templateId,
      templateParams,
      this.env.publicKey
    )
    console.log(result)
  }
  
  private getIitialDate(): Date {
    const result = new Date()
    result.setDate(result.getDate() + 5)
    return result
  }

}
