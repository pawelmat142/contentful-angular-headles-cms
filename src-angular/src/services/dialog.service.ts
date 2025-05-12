import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";
import { Observable } from 'rxjs';
import { DialogComponent } from '../app/components/dialog/dialog.component';
import { Toast } from './toast.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogFooterComponent } from '../app/components/dialog/dialog-footer/dialog-footer.component';

export type Severity = 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'help' | 'contrast' | null | undefined

@Injectable({
  providedIn: 'root'
})
export class Dialog extends DialogService {

  private readonly toast = inject(Toast)
  private readonly translateService = inject(TranslateService)

  public popup = (data: DynamicDialogConfig): Observable<any> => {
    return this.open(DialogComponent, data)?.onClose
  }

  public example() {
    this.popup({
      header: this.translateService.instant('popup.header'),
      closable: true,
      data: {
        content: [this.translateService.instant('popup.example')],
        buttons: [ { 
          label: this.translateService.instant('popup.cancel'), 
            value: false,
            severity: 'danger', 
            onClick: () => this.toast.error(this.translateService.instant('popup.canceled')) 
          }, { 
            label: this.translateService.instant('popup.confirm'), 
            value: this.translateService.instant('popup.confirmed'),
          },
        ],
        imports: [DialogComponent, DialogFooterComponent]
      },
      templates: {
        footer: DialogFooterComponent
      }
    }).subscribe(result => {
      if (result) {
        this.toast.info(result)
      }
    }) 
  }
}
