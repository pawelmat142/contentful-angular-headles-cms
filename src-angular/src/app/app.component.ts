import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from './view/header/header.component';
import { Translate } from '../services/translate.service';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        ToastModule,
        HeaderComponent,
    ],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private readonly translate: Translate,
  ) {}

  ngOnInit(): void {
    this.translate.initialize()
  }

}
