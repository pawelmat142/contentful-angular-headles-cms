import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { ContactComponent } from './view/contact/contact.component';
import { PATH } from './services/path';

export const routes: Routes = [{
    path: PATH.HOME, 
    component: HomeComponent
}, {
    path: PATH.CONTACT,
    component: ContactComponent
}, {
    path: '**',
    redirectTo: PATH.HOME
}];
