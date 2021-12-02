import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenHelper} from "../../helpers/token.helper";
import {Observable} from "rxjs";
import {Packages} from "../../data/Packages";

@Injectable()
export class PackageService {

  readonly url = `${environment.baseUrl}/v1/barbershop`

  constructor(private http: HttpClient, private tokenHelper :TokenHelper) { }

  private httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.tokenHelper.getToken(),
  });

  create(packages: Packages): Observable<Packages>{
    return this.http.post<Packages>(`${this.url}/packages`, packages, {
      headers: this.httpHeaders
    });
  }

  update(id: number, packages: Packages): Observable<void>{
    return this.http.put<void>(`${this.url}/packages/${id}`, packages, {
      headers: this.httpHeaders
    });
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/packages/${id}`, {
      headers: this.httpHeaders
    });
  }

  show(id: number): Observable<Packages>{
    return this.http.get<Packages>(`${this.url}/packages/${id}`, {
      headers: this.httpHeaders
    });
  }


  list(id: number): Observable<Packages[]>{
    return this.http.get<Packages[]>(`${this.url}/barbers/${id}/packages`, {
      headers: this.httpHeaders
    })
  }
}
