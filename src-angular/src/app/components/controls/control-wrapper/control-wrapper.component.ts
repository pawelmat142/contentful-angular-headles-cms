import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

type ControlSize = 'big' | 'standard' | 'small'

@Component({
  selector: 'app-control-wrapper',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './control-wrapper.component.html',
  styleUrl: './control-wrapper.component.scss',
})
export class ControlWrapperComponent {

  readonly sizes: Record<ControlSize, number> = {
    big: 540,
    standard: 255,
    small: 150
  }

  @Input() label?: string

  @Input() required?: boolean

  @Input() size: ControlSize = 'standard'

  @ContentChild(NgControl, { descendants: true }) ngControl?: NgControl;

}
