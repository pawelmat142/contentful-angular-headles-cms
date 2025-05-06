import { Component } from '@angular/core';
import { ViewWrapperComponent } from '../view-wrapper/view-wrapper.component';

@Component({
    selector: 'app-home',
    imports: [
        ViewWrapperComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
}
