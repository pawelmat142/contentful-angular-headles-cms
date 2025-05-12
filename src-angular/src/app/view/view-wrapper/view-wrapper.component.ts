import { Component } from '@angular/core';
import { Animation } from '../../../utils/animation';

@Component({
    selector: 'app-view-wrapper',
    imports: [],
    templateUrl: './view-wrapper.component.html',
    styleUrl: './view-wrapper.component.scss',
    animations: [
        Animation.fadeIn()
    ]
})
export class ViewWrapperComponent {

}
