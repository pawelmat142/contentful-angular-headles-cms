import { Routes } from '@angular/router';
import { HomeComponent } from '../view/home/home.component';
import { ContactComponent } from '../view/contact/contact.component';
import { PATH } from '../services/path';
import { ItemsComponent } from '../view/items/items.component';
import { FormViewComponent } from '../view/form-view/form-view.component';

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
