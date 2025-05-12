import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog',
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: './dialog.component.html',
  standalone: true
})
export class DialogComponent {

  constructor(
    public config: DynamicDialogConfig
  ) {}

}
