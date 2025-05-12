import { Component } from '@angular/core';
import { Lang, Translate } from '../../../../services/translate.service';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { Animation } from '../../../../utils/animation';

@Component({
    selector: 'app-language-select',
    imports: [
        DropdownModule,
        CommonModule,
        SelectModule,
        TranslateModule,
        FormsModule
    ],
    templateUrl: './language-select.component.html',
    styleUrl: './language-select.component.scss',
    animations: [
      Animation.fadeIn(300)
    ]
})
export class LanguageSelectComponent {

  constructor(private readonly translate: Translate) {}

  _options: Lang[] = this.translate.SUPPORTED_LANGUAGES

  _current$: Observable<Lang> = this.translate.currentLang$
  
  _onSelect(event: DropdownChangeEvent) {
    this.translate.switchLanguage(event.value.code)
  }
}
