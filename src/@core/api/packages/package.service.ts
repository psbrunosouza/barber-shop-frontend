import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenHelper} from "../../helpers/token.helper";
import {Observable} from "rxjs";
import {PackageModel} from "../../data/PackageModel";

@Injectable()
export class PackageService {

  readonly url = `${environment.baseUrl}/v1/barbershop`

  constructor(private http: HttpClient, private tokenHelper: TokenHelper) {
  }

  private httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.tokenHelper.getToken(),
  });

  create(packages: PackageModel): Observable<PackageModel> {
    return this.http.post<PackageModel>(`${this.url}/packages`, packages, {
      headers: this.httpHeaders
    });
  }

  update(id: number, packages: PackageModel): Observable<void> {
    return this.http.put<void>(`${this.url}/packages/${id}`, packages, {
      headers: this.httpHeaders
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/packages/${id}`, {
      headers: this.httpHeaders
    });
  }

  show(id: number): Observable<PackageModel> {
    return this.http.get<PackageModel>(`${this.url}/packages/${id}`, {
      headers: this.httpHeaders
    });
  }


  list(id: number): Observable<PackageModel[]> {
    return this.http.get<PackageModel[]>(`${this.url}/barbers/${id}/packages`, {
      headers: this.httpHeaders
    })
  }

  offeredServices(id: number): Observable<number> {
    return this.http.get<number>(`${this.url}/packages/barbers/${id}/offered_service`, {
      headers: this.httpHeaders
    })
  }
}
