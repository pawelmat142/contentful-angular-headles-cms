import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectComponent } from '../../components/controls/language-select/language-select.component';
import { Router } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { Animation } from '../../../utils/animation';

@Component({
    selector: 'app-header',
    imports: [
        CommonModule,
        TranslateModule,
        LanguageSelectComponent
    ],
    templateUrl: './header.component.html',
    animations: [ Animation.fadeIn(200) ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private readonly menuService: MenuService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.menuService.updateItems()
    })
  }

  menuItems$ = this.menuService.items$.asObservable()

  async menuItemClick(event: Event, item: MenuItem) {
    if (item.command) {
      item.command(event as MenuItemCommandEvent);
    }
    if (typeof item.url === 'string') {
      const success = await this.router.navigate([`/${item.url}`])
      if (success) {
        this.menuService.updateItems()
      }
    }
  }

}
