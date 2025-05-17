import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectComponent } from '../../components/controls/language-select/language-select.component';
import { MenuService } from '../../../services/menu.service';
import { Animation } from '../../../utils/animation';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
    selector: 'app-header',
    imports: [
      CommonModule,
      ButtonModule,
      TranslateModule,
      LanguageSelectComponent,
      DrawerModule,
      PanelMenuModule,
      PanelMenu
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    animations: [ Animation.fadeIn(200) ]
})
export class HeaderComponent {

  constructor(
    private readonly menuService: MenuService
  ) {
    this.menuService.mobileMenuVisible$.subscribe(mobileMenuVisible => {
      this.mobileMenuVisible = mobileMenuVisible
    })

    this.menuService.items$.subscribe(menuItems => {
      this.menuItems = menuItems
    })
  }
  
  menuItems: MenuItem[] = []
  
  menuItemClick(event: Event, item: MenuItem) {
    this.menuService.itemClick(event, item)
  }

  mobileMenuVisible = false

  showMenu() {
    this.mobileMenuVisible = true
  }
  
  closeMenu() {
    this.mobileMenuVisible = false
  }
}
