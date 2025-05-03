import { Component } from '@angular/core';
import { Lang, Translate } from '../../../services/translate.service';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-select',
  standalone: true,
  imports: [
    DropdownModule,
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './language-select.component.html',
  styleUrl: './language-select.component.scss',
})
export class LanguageSelectComponent {

  constructor(private readonly translate: Translate) {}

  _options: Lang[] = this.translate.SUPPORTED_LANGUAGES

  _current$: Observable<Lang> = this.translate.currentLang$
  
  _onSelect(event: DropdownChangeEvent) {
    this.translate.switchLanguage(event.value.code)
  }
}
