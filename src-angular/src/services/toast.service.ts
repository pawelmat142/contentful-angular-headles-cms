import { Injectable } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class Toast {

  private readonly TIME = 3000

  constructor(
    private readonly messageService: MessageService
  ) { }

  success = (detail: string, summary = 'Success') => this.toast({ severity: 'success', summary, detail })
  info = (detail: string, summary = 'Info') => this.toast({ severity: 'info', summary, detail })
  warn = (detail: string, summary = 'Warn') => this.toast({ severity: 'warn', summary, detail })
  error = (detail: string, summary = 'Error') => this.toast({ severity: 'error', summary, detail })

  private toast(message: ToastMessageOptions) {
    message.life = this.TIME
    this.messageService.add(message)
  }

}
