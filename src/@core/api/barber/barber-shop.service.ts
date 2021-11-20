import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BarberShop, BarberShopServiceModel} from "../../data/BarberShop";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenHelper} from "../../helpers/token.helper";

@Injectable()
export class BarberShopService implements BarberShopServiceModel{

  readonly url = `${environment.baseUrl}/v1/barbershop/barbers`

  constructor(private http: HttpClient, private tokenHelper :TokenHelper) { }

  private httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.tokenHelper.getToken(),
  });

  create(barber: BarberShop): Observable<BarberShop>{
    return this.http.post<BarberShop>(`${this.url}`, barber);
  }

  list(): Observable<BarberShop>{
    return this.http.get<BarberShop>(`${this.url}`, {
      headers: this.httpHeaders
    });
  }

  find(id: number): Observable<BarberShop>{
    return this.http.get<BarberShop>(`${this.url}/${id}`, {
      headers: this.httpHeaders
    });
  }

  update(barberShop: BarberShop): Observable<void>{
    return this.http.put<void>(`${this.url}`, barberShop, {
      headers: this.httpHeaders
    });
  }

  delete(): Observable<void>{
    return this.http.delete<void>(`${this.url}`, {
      headers: this.httpHeaders
    });
  }
}
