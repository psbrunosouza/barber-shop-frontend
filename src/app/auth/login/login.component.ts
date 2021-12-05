import {Component, OnInit} from '@angular/core';
import {User} from "../../../@core/data/User";
import {AuthUserService} from "../../../@core/api/auth/auth-user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {ToasterHelper} from "../../../@core/helpers/toaster.helper";
import {TokenHelper} from "../../../@core/helpers/token.helper";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthUserService, TokenHelper, ToasterHelper]
})
export class LoginComponent implements OnInit {
  user!: User;

  constructor(
    private authService: AuthUserService,
    private router: Router,
    private tokenHelper: TokenHelper,
    private toaster: ToasterHelper
  ) {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  login(form: NgForm): void {
    if (form.valid) {
      this.authService.login(this.user).subscribe((response) => {
        if (response.token) this.tokenHelper.setToken(response.token);
        this.toaster.showSuccess("Sucesso", `${this.tokenHelper.getUserName()}, Seja bem vindo!`);
        this.router.navigate(["/dashboard"]);
      }, () => {
        this.toaster.showError("Erro", "Cheque as suas credenciais!");
      });
    }
  }
}

