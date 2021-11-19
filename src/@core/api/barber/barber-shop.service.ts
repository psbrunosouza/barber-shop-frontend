import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BarberShop, BarberShopServiceModel} from "../../data/BarberShop";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class BarberShopService implements BarberShopServiceModel{

  readonly url = `${environment.baseUrl}/v1/barbershop/barbers`

  constructor(private http: HttpClient) { }

  registerBarberShop(barber: BarberShop): Observable<BarberShop>{
    return this.http.post<BarberShop>(`${this.url}`, barber);
  }
}
