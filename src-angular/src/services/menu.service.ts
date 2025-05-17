import { Injectable } from '@angular/core';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { PATH } from '../config/path';
import { Dialog } from './dialog.service';
import { BehaviorSubject, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Lang, Translate } from './translate.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private readonly dialog: Dialog,
    private readonly router: Router,
    private readonly translate: Translate,
    private readonly translateService: TranslateService,
  ) {
    this.translate.currentLang$.subscribe(lang => {
      if (lang) {
        this.updateItems()
      }
    })
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.closeMenu()
      this.updateItems()
    })
  }

  private _items$ = new BehaviorSubject<MenuItem[]>(this.prepareItems({ findActive: true }))

  mobileMenuVisible$ = new BehaviorSubject(false)

  get items$() {
    return this._items$.asObservable()
      // .pipe(tap(console.log))
  }

  public updateItems() {
    this._items$.next(this.prepareItems({ findActive: true }))
  }

  private prepareItems(params?: { findActive?: boolean }): MenuItem[] {
    const result: MenuItem[] = [{
      label: this.translateService.instant('header.home'),
      command: () => this.itemNavigate(PATH.HOME),
      icon: 'pi pi-home'
    }, {
      label: this.translateService.instant('header.contact'),
      routerLink: PATH.CONTACT,
      icon: 'pi pi-address-book'
    }, {
      label: this.translateService.instant('header.items'),
      routerLink: PATH.ITEMS,
      icon: 'pi pi-th-large'
    }, {
      label: this.translateService.instant('form.title'),
      routerLink: PATH.FORM,
      icon: 'pi pi-calendar'
    }, {
      label: this.translateService.instant('header.language'),
      icon: 'pi pi-language',
      styleClass: 'menu-mobile',
      items: this.translate.SUPPORTED_LANGUAGES.map(lang => {
        return {
          label: lang.name,
          command: () => {
            this.closeMenu()
            this.translate.switchLanguage(lang.code)
          }
        }
      })
    }, {
      label: this.translateService.instant('popup.header'),
      icon: 'pi pi-comment',
      command: () => {
        this.closeMenu()
        this.dialog.example()
      }
    }]
    
    if (params?.findActive) {
      const url = this.router.url.trim().replace('/', '')
      result.forEach(item => {
        if (typeof item.routerLink === 'string' && item.routerLink === url) {
          item.styleClass = 'active'
        }
      })
      if (!url) {
        result[0].styleClass = 'active'
      }
    }
    return result
  }

  public itemClick(event: Event, item: MenuItem) {
    if (item.command) {
      item.command(event as MenuItemCommandEvent)
      this.closeMenu()
    }
    if (typeof item.routerLink === 'string') {
      this.itemNavigate(item.routerLink)
    }
  }
  
  private async itemNavigate(url: string) {
    this.closeMenu()
    const success = await this.router.navigate([`/${url}`])
    if (success) {
      this.updateItems()
    }
  }

  private closeMenu() {
    this.mobileMenuVisible$.next(false)
  }
}
