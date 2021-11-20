import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../data/User";
import {TokenHelper} from "../../helpers/token.helper";

@Injectable()
export class UserService {

  readonly url = `${environment.baseUrl}/v1/barbershop/users`;

  constructor(private http: HttpClient, private tokenHelper :TokenHelper) { }

  private httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.tokenHelper.getToken(),
  });

  create(user: User): Observable<User>{
    return this.http.post<User>(`${this.url}`, user);
  }

  update(user: User): Observable<void>{
    return this.http.put<void>(`${this.url}`, user, {
      headers: this.httpHeaders
    });
  }

  profile(): Observable<User>{
    return this.http.get<User>(`${this.url}/profile`, {
      headers: this.httpHeaders
    });
  }

  delete(): Observable<void>{
    return this.http.delete<void>(`${this.url}`, {
      headers: this.httpHeaders
    });
  }
}
