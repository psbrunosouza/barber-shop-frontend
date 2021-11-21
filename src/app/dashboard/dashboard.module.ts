import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import {ComponentsModule} from "../../@components/components.module";
import {DashboardComponent} from "./dashboard.component";
import {RouterModule} from "@angular/router";
import { UserComponent } from './user/user.component';
import {FormsModule} from "@angular/forms";
import {TokenHelper} from "../../@core/helpers/token.helper";



@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    UserComponent,
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ComponentsModule,
        RouterModule,
        FormsModule,
    ],
  providers: [
    TokenHelper
  ]
})
export class DashboardModule { }
