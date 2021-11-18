import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
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
