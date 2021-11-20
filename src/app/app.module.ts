import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicosBarberComponent } from './servicos-barber/servicos-barber.component';
import { ContatoBarberComponent } from './contato-barber/contato-barber.component';
import { CarrinhoComprasBarberComponent } from './carrinho-compras-barber/carrinho-compras-barber.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import {LayoutModule} from "../@layout/layout.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    AppComponent,
    ServicosBarberComponent,
    ContatoBarberComponent,
    CarrinhoComprasBarberComponent,
    EditarClienteComponent,
    AtendimentoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
