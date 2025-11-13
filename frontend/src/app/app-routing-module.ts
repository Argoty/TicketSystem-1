import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { App } from './app';
import { LoginPageComponent } from './atomic/pages/login-page/login-page';
import { UserDashboardPageComponent } from './atomic/pages/user-dashboard-page/user-dashboard-page';
import { ProfilePageComponent } from './atomic/pages/profile-page/profile-page';
import { TicketPageComponent } from './atomic/pages/ticket-page/ticket-page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'dashboard/user',
    component: UserDashboardPageComponent,
    data: { roles: ['USER'] }
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: 'ticket/:id',
    component: TicketPageComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
