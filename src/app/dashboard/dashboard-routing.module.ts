import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard.component';
import {UserComponent} from './user/user.component';
import {AuthGuard} from '../../@core/guards/auth.guard';
import {PackagesComponent} from './packages/packages.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {BarberComponent} from "./barber/barber.component";
import {BarberProfileComponent} from "./barber/barber-profile/barber-profile.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'packages',
        component: PackagesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'barber',
        component: BarberComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile/:id',
        component: BarberProfileComponent,
        canActivate: [AuthGuard]
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardRoutingModule {
}
