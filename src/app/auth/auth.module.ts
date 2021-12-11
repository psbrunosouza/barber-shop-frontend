import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomFormsModule} from "ng2-validation";
import {AuthRoutingModule} from "./auth-routing.module";


@NgModule({
  declarations: [
    AuthComponent, LoginComponent, RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
