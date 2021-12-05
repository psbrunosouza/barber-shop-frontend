import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplateComponent} from "./template/template.component";
import {DashboardFooterComponent} from "./components/dashboard-footer/dashboard-footer.component";
import {DashboardHeaderComponent} from "./components/dashboard-header/dashboard-header.component";
import {DashboardSidebarComponent} from "./components/dashboard-sidebar/dashboard-sidebar.component";
import {RouterModule} from "@angular/router";
import {TooltipModule} from "ng2-tooltip-directive";


@NgModule({
  declarations: [TemplateComponent, DashboardFooterComponent, DashboardHeaderComponent, DashboardSidebarComponent],
  imports: [
    CommonModule, RouterModule, TooltipModule
  ],
  exports: [
    TemplateComponent, DashboardFooterComponent, DashboardHeaderComponent, DashboardSidebarComponent
  ]
})
export class ThemeModule {
}
