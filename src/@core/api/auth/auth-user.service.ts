import {Injectable} from '@angular/core';
import {UserModel} from "../../data/UserModel";
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthUserService {

  readonly url = `${environment.baseUrl}/v1/barbershop/users`

  constructor(private http: HttpClient) {
  }

  login(user: UserModel): Observable<TokenModel> {
    return this.http.post<TokenModel>(`${this.url}/login`, user);
  }
}
