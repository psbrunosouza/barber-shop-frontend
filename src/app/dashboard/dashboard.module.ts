import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {HomeComponent} from './home/home.component';
import {ComponentsModule} from "../../@components/components.module";
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
import {BarberProfileComponent} from "./barber/barber-profile/barber-profile.component";
import {ChartsModule} from "ng2-charts";
import { BarberShopCardComponent } from './barber/barber-shop-card/barber-shop-card.component';

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
    BarberProfileComponent,
    BarberShopCardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    ModalDialogModule,
    ChartsModule
  ],
  providers: [
    TokenHelper,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class DashboardModule {
}
