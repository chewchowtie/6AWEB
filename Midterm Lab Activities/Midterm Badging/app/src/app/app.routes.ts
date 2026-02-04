import { Services } from './services/services';
import { About } from './about/about';
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './contact/contact';


export const routes: Routes = [
  { path: '', component: Home},
  { path: 'about', component: About},
  { path: 'contact', component: Contact},
  { path: 'services', component: Services}
];
