import { Component } from '@angular/core';
import { ViewWrapperComponent } from '../view-wrapper/view-wrapper.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { FilesUploadComponent } from '../../components/controls/files-upload/files-upload.component';
import { ContentService } from '../../../services/content.service';
import { Toast } from '../../../services/toast.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import { EmailForm, EmailService } from '../../../services/email.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { ControlWrapperComponent } from '../../components/controls/control-wrapper/control-wrapper.component';
import { ScheduleService } from '../../../services/schedule.service';
import { FormUtil } from '../../../utils/form.util';

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
    ProgressSpinner,

    ViewWrapperComponent,
    FilesUploadComponent,
    ControlWrapperComponent,
  ],
  templateUrl: './form-view.component.html',
  styleUrl: './form-view.component.scss'
})
export class FormViewComponent {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl(this.getIitialDate(), Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    details: new FormControl(''),
    files: new FormControl<File[]>([]),
  })
  
  constructor(
    private readonly contentService: ContentService,
    private readonly toast: Toast,
    private readonly translate: TranslateService,
    private readonly emailService: EmailService,
    private readonly scheduleService: ScheduleService,
  ) {}

  disabledDates$ = this.scheduleService.getDisabledDates$()

  _spinner = false

  onFilesUpdate(files?: File[]) {
    this.form.controls.files.setValue(files || [])
  }

  _submit(event?: Event) {
    if (this.form.invalid) {
      FormUtil.markForm(this.form)
      return
    }

    this._spinner = true

    this.uploadFiles$().pipe(
      switchMap(urls => {
        if (urls) {
          return this.emailService.sendEmail(this.form.value as EmailForm, Array.isArray(urls) ? urls : undefined)
        } else {
          return of()
        }
      }),
    ).subscribe({
      next: () => {
        this.toast.info(this.translate.instant('form.email.success'))
        this.form.reset()
        this._spinner = false
      },
      error: (error) => {
        console.log(error)
        this.toast.error(this.translate.instant('form.email.error'))
        this._spinner = false
      }
    })
  }

  private uploadFiles$(): Observable<string[] | boolean> {
    const files = this.form.controls.files.value
    const filename = this.form.value.name as string
    if (files?.length) {
      return this.contentService.uploadFiles$(files, filename).pipe(
        map(uploads => {
          const errors = uploads.filter(upload => upload.error).map(upload => upload.error!)
          if (errors.length) {
            this._spinner = false
            errors.forEach(error => {
              this.toast.error(error)
            })
            return false
          } else {
            return uploads.filter(upload => upload.url).map(upload => upload.url!)
          }
        }),
      )
    }
    return of(true)
  }

  private getIitialDate(): Date {
    const result = new Date()
    result.setDate(result.getDate() + 5)
    return result
  }

}
