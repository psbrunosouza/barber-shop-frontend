import jwt_decode from 'jwt-decode';
import {Injectable} from "@angular/core";

interface Token {
  exp: number;
  iat: number;
  userId: number;
  barberId: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenHelper {

  constructor() {
  }

  getToken(): string | null{
     return localStorage.getItem('token');
  }

  setToken(token: string): void{
    localStorage.setItem('token', token);
  }

  isExpiredToken(): boolean{
    const token = this.decodeToken();
    if(token){
      return Date.now() >= token?.exp * 1000;
    }else{
      return false;
    }
  }

  decodeToken(): Token | null{
    return jwt_decode<Token>(String(this.getToken()));
  }

  getUserId(): number | undefined {
    return this.decodeToken()?.userId;
  }

  getBarberId(): number | undefined  {
    return this.decodeToken()?.barberId;
  }

  getUserName(): string | undefined {
    return this.decodeToken()?.name;
  }
}
