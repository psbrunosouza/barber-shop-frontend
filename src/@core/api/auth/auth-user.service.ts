import { Injectable } from '@angular/core';
import {User} from "../../data/User";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthUserService {

  readonly url = `${environment.baseUrl}/v1/barbershop/users`

  constructor(private http: HttpClient) {}

  login(user: User): Observable<Token>{
    return this.http.post<Token>(`${this.url}/login`, user);
  }


}
