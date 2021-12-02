import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenHelper} from "../../helpers/token.helper";
import {environment} from "../../../environments/environment";
import {ServiceOrder} from "../../data/ServiceOrder";

@Injectable()
export class ServiceOrderService {

  readonly url = `${environment.baseUrl}/v1/barbershop/service_orders`

  constructor(private http: HttpClient, private tokenHelper: TokenHelper) {
  }

  private httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.tokenHelper.getToken(),
  });

  list(): Observable<ServiceOrder[]> {
    return this.http.get<ServiceOrder[]>(`${this.url}`, {
      headers: this.httpHeaders
    })
  }

  create(serviceOrder: ServiceOrder): Observable<ServiceOrder> {
    return this.http.post<ServiceOrder>(`${this.url}`, serviceOrder, {
      headers: this.httpHeaders
    })
  }
}
