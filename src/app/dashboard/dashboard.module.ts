import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import {ComponentsModule} from "../../@components/components.module";
import {DashboardComponent} from "./dashboard.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    RouterModule,
  ]
})
export class DashboardModule { }
