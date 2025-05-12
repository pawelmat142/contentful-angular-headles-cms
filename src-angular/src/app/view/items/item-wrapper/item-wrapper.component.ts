import { Component, Input } from '@angular/core';
import { ItemContent } from '../items.component';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-item-wrapper',
    imports: [
        CommonModule,
        GalleriaModule,
        FormsModule,
        ImageModule,
    ],
    templateUrl: './item-wrapper.component.html',
    styleUrl: './item-wrapper.component.scss'
})
export class ItemWrapperComponent {

  @Input() item!: ItemContent


}
