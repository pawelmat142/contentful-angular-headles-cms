import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-footer',
  imports: [
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './dialog-footer.component.html',
  styleUrl: './dialog-footer.component.scss',
  standalone: true
})
export class DialogFooterComponent {

  constructor(
    private ref: DynamicDialogRef, 
    public config: DynamicDialogConfig
  ) {}

  onButtonClick(btn: { value: any, onClick?: () => {}}) {
    if (btn.onClick) {
      btn.onClick()
    }
    this.ref.close(btn.value)
  }

}
