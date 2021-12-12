import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenHelper} from "../../helpers/token.helper";
import {environment} from "../../../environments/environment";
import {ServiceOrderModel} from "../../data/ServiceOrderModel";

@Injectable()
export class ServiceOrderService {

  readonly url = `${environment.baseUrl}/v1/barbershop/service_orders`

  constructor(private http: HttpClient, private tokenHelper: TokenHelper) {
  }

  private httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.tokenHelper.getToken(),
  });

  listByProvider(id: number, query?: string): Observable<ServiceOrderModel[]> {
    return this.http.get<ServiceOrderModel[]>(`${this.url}/byProvider/${id}?status=${query}`, {
      headers: this.httpHeaders
    })
  }

  listByRequested(): Observable<ServiceOrderModel[]> {
    return this.http.get<ServiceOrderModel[]>(`${this.url}/byRequested`, {
      headers: this.httpHeaders
    })
  }

  create(serviceOrder: ServiceOrderModel): Observable<ServiceOrderModel> {
    return this.http.post<ServiceOrderModel>(`${this.url}`, serviceOrder, {
      headers: this.httpHeaders
    })
  }
}
