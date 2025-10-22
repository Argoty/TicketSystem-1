import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/pages/login-page/login-page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
