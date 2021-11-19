import { Injectable } from '@angular/core';
import {User} from "../../data/User";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class AuthUserService {

  readonly url = 'http://localhost:3333/v1/barbershop/users/login'

  constructor(private http: HttpClient) {

  }

  auth(user: User): Observable<Token>{
    return this.http.post<Token>(this.url, user);
  }
}
