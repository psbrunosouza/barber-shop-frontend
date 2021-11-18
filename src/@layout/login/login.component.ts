import { Component, OnInit } from '@angular/core';
import {User} from "../../@core/data/User";
import {AuthUserService} from "../../@core/services/auth/auth-user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthUserService]
})
export class LoginComponent implements OnInit {
  user!: User;
  errorHandler = {
    passwordError: {error: false, message: ""},
    emailError: {error: false, message: ""},
  };

  constructor(private authService: AuthUserService, private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
  }

  redirect(): void{
    this.router.navigateByUrl("/dashboard");
  }

  validateEmail(): boolean{
    if(this.user && (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/).test(this.user?.email)){
      this.errorHandler.emailError = {
        message: "",
        error: false
      };
    }else{
      this.errorHandler.emailError = {
        message: "E-mail deve ser no formato email@email.com",
        error: true
      };
    }

    return (this.user && (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/).test(this.user?.email));
  }

  validatePassword(): boolean{
    if(this.user && this.user?.password.length > 8){
      this.errorHandler.passwordError = {
        message: "",
        error: false
      }
    }else{
      this.errorHandler.passwordError = {
        message: "Senha deve ter no minimo 8 caracteres, com pelo menos um numero e uma letra",
        error: true
      }
    }
    return (this.user && this.user?.password.length > 8);
  }

  login(form: NgForm): void {
    this.validatePassword();
    this.validateEmail();
    if(form.valid && this.validatePassword() && this.validateEmail()){
      this.authService.auth(this.user).subscribe((response) => {
        localStorage.setItem("token", response.token);
        this.redirect();
        //TODO: put an ok toast
      });
    }else{
      //TODO: put an error toast
    }
  }
}

