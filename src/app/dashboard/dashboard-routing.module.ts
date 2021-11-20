import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard.component";
import {UserComponent} from "./user/user.component";
import {AuthGuard} from "../../@core/guards/auth.guard";

const routes: Routes = [
  { path: '',
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
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardRoutingModule { }
