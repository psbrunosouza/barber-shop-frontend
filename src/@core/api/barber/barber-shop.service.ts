import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BarberShopModel, BarberShopServiceModel} from "../../data/BarberShopModel";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenHelper} from "../../helpers/token.helper";

@Injectable()
export class BarberShopService implements BarberShopServiceModel {

  readonly url = `${environment.baseUrl}/v1/barbershop/barbers`

  constructor(private http: HttpClient, private tokenHelper: TokenHelper) {
  }

  private httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.tokenHelper.getToken(),
  });

  create(barber: BarberShopModel): Observable<BarberShopModel> {
    return this.http.post<BarberShopModel>(`${this.url}`, barber);
  }

  list(): Observable<BarberShopModel[]> {
    return this.http.get<BarberShopModel[]>(`${this.url}`, {
      headers: this.httpHeaders
    });
  }

  find(id: number): Observable<BarberShopModel> {
    return this.http.get<BarberShopModel>(`${this.url}/${id}`, {
      headers: this.httpHeaders
    });
  }

  update(barberShop: BarberShopModel): Observable<void> {
    return this.http.put<void>(`${this.url}`, barberShop, {
      headers: this.httpHeaders
    });
  }

  delete(): Observable<void> {
    return this.http.delete<void>(`${this.url}`, {
      headers: this.httpHeaders
    });
  }
}
