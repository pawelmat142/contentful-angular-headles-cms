import { Routes } from '@angular/router';
import { HomeComponent } from '../app/view/home/home.component';
import { ContactComponent } from '../app/view/contact/contact.component';
import { PATH } from './path';
import { ItemsComponent } from '../app/view/items/items.component';
import { FormViewComponent } from '../app/view/form-view/form-view.component';

export const routes: Routes = [{
    path: PATH.HOME, 
    component: HomeComponent
}, {
    path: PATH.CONTACT,
    component: ContactComponent
}, {
    path: PATH.ITEMS,
    component: ItemsComponent
}, {
    path: PATH.FORM,
    component: FormViewComponent
}, {
    path: '**',
    redirectTo: PATH.HOME
}];
