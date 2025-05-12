import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment.prod';
import { BehaviorSubject } from 'rxjs';
import { PrimeNG } from 'primeng/config';

export interface Lang {
  code: string
  locale: string
  flag: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class Translate {

  public readonly SUPPORTED_LANGUAGES: Lang[] = environment.languages
  private readonly SUPPORTED_LANGUAGE_CODES: string[] = this.SUPPORTED_LANGUAGES.map(l => l.code)

  currentLang$ = new BehaviorSubject<Lang>(this.defaultLang())
    
  constructor(
    private translateService: TranslateService,
    private primeNgConfig: PrimeNG,
  ) {
    this.translateService.onLangChange.subscribe(event => {
      const lang = this.SUPPORTED_LANGUAGES.find(lang => lang.code === event.lang)
      console.log(`Current language: ${lang?.code}`)
      if (lang) {
        this.currentLang$.next(lang)
        this.primeNgConfig.setTranslation(event.translations['CALENDAR'])
      }
    })
  }

  public initialize() {
    const browserLanguage = this.translateService.getBrowserLang()
    const language: string = this.prepareLang(browserLanguage)

    this.translateService.setDefaultLang(language)
    this.translateService.use(language)
  }

  public switchLanguage(lang: string) {
    this.translateService.use(this.prepareLang(lang))
  }

  private prepareLang(input?: string): string {
    if (input && this.SUPPORTED_LANGUAGE_CODES.includes(input)) {
      return input
    } else {
      return this.SUPPORTED_LANGUAGE_CODES[0]
    }
  }

  private defaultLang(): Lang {
    return this.SUPPORTED_LANGUAGES[0]
  }
}
