import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PATH } from '../config/path';
import { Dialog } from './dialog.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private readonly dialog: Dialog,
    private readonly router: Router,
  ) {}

  items$ = new BehaviorSubject<MenuItem[]>(this.prepareItems())

  public updateItems() {
    this.items$.next(this.prepareItems({ findActive: true }))
  }

  private prepareItems(params?: { findActive?: boolean }): MenuItem[] {
    const result: MenuItem[] = [{
      label: 'header.home',
      url: PATH.HOME,
    }, {
      label: 'header.contact',
      url: PATH.CONTACT,
    }, {
      label: 'header.items',
      url: PATH.ITEMS,
    }, {
      label: 'form.title',
      url: PATH.FORM,
    },{
      label: 'popup.header',
      command: () => {
        this.dialog.example()
      }
    }]

    if (params?.findActive) {
      const url = this.router.url.trim().replace('/', '')
      result.forEach(item => {
        if (typeof item.url === 'string' && item.url === url) {
          item.styleClass = 'active'
        }
      })
    }

    return result
  }

}
