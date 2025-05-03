import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Toast } from './toast.service';
import { PATH } from './path';
import { Dialog } from './dialog.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private readonly toast: Toast,
    private readonly dialog: Dialog,
    private readonly router: Router
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
    }, {
      label: 'Toast',
      command: () => {
        this.toast.info('TODO!')
      },
    },{
      label: 'Popup',
      command: () => {
        this.dialog.popup({
          header: 'Popup',
          content: ['Example']
        })
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
