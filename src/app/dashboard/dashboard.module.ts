import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from "./dashboard.component";
import {RouterModule} from "@angular/router";
import {UserComponent} from './user/user.component';
import {FormsModule} from "@angular/forms";
import {TokenHelper} from "../../@core/helpers/token.helper";
import {PackagesComponent} from './packages/packages.component';
import {ScheduleComponent} from './schedule/schedule.component';

import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import {ModalDialogModule} from "ngx-modal-dialog";
import {DeletePackageComponent} from './packages/delete-package/delete-package.component';
import {EditPackageComponent} from './packages/edit-package/edit-package.component';
import {BarberComponent} from './barber/barber.component';
import {BarberDetailsComponent} from "./barber/barber-details/barber-details.component";
import {ChartsModule} from "ng2-charts";
import {BarberShopCardComponent} from './barber/barber-shop-card/barber-shop-card.component';
import {LayoutModule} from "../../@layout/layout.module";
import {ThemeModule} from "../../@theme/theme.module";
import { BarberContractServiceComponent } from './barber/barber-details/barber-contract-service/barber-contract-service.component';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    UserComponent,
    PackagesComponent,
    ScheduleComponent,
    DeletePackageComponent,
    EditPackageComponent,
    BarberComponent,
    BarberDetailsComponent,
    BarberShopCardComponent,
    BarberContractServiceComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    FormsModule,
    ModalDialogModule,
    ChartsModule,
    LayoutModule,
    ThemeModule

  ],
  providers: [
    TokenHelper,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class DashboardModule {
}
