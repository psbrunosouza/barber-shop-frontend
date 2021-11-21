import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenHelper} from "../helpers/token.helper";
import {ToasterHelper} from "../helpers/toaster.helper";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private toaster: ToasterHelper;
  private tokenHelper: TokenHelper = new TokenHelper();

  constructor(
    private router: Router,
    private _toaster: ToastrService
  ) {
    this.toaster = new ToasterHelper(_toaster);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.tokenHelper.getToken() || this.tokenHelper.isExpiredToken()) {
      this.toaster.showWarning('Erro', 'Seu tempo de seção expirou, por favor realize o login novamente.')
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
