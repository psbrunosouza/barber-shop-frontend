import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './layouts/dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './layouts/dashboard-footer/dashboard-footer.component';
import { DashboardSidebarComponent } from './layouts/dashboard-sidebar/dashboard-sidebar.component';
import {RouterModule} from "@angular/router";
import {TooltipModule} from "ng2-tooltip-directive";

@NgModule({
  declarations: [
    DashboardHeaderComponent,
    DashboardFooterComponent,
    DashboardSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule
  ],
  exports: [
    DashboardFooterComponent,
    DashboardHeaderComponent,
    DashboardSidebarComponent
  ]
})
export class ComponentsModule { }
