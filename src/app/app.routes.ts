import { Routes } from '@angular/router';
import { ScoutPageComponent } from './features/scout/scout-page.component';
import { ContactPageComponent } from './features/contact/contact-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'scout', pathMatch: 'full' },
  { path: 'scout', component: ScoutPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: '**', redirectTo: 'scout' }
];
