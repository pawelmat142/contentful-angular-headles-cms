import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { DialogService } from "primeng/dynamicdialog";

export interface DialogData {
  header: string
  content?: string[]
  isError?: boolean
  error?: Error
  buttons?: DialogBtn[]
  input?: string
  inputValidators?: ValidatorFn[]
  inputClass?: string
  inputValue?: string
  select?: string
}

export interface DialogBtn {
  label: string
  severity?: Severity
  result?: any
  type?: 'button' | 'submit'
  onclick?: () => any
}

export type Severity = 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined


@Injectable({
  providedIn: 'root'
})
export class Dialog extends DialogService {


  public popup = (data: DialogData) => {
    // TODO ngprime popup
}
}
