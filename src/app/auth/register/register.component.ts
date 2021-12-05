import {Component, OnInit} from '@angular/core';
import {User} from "../../../@core/data/User";
import {NgForm} from "@angular/forms";
import {BarberShop} from "../../../@core/data/BarberShop";
import {AuthUserService} from "../../../@core/api/auth/auth-user.service";
import {BarberShopService} from "../../../@core/api/barber/barber-shop.service";
import {Router} from "@angular/router";
import {ToasterHelper} from "../../../@core/helpers/toaster.helper";
import {UserService} from "../../../@core/api/user/user.service";

enum PROFILE {
  USER = "user",
  BARBER = "barber"
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthUserService, BarberShopService, ToasterHelper, UserService]
})
export class RegisterComponent implements OnInit {
  user: User;
  barber: BarberShop;
  isBarber: boolean;

  constructor(
    private userService: UserService,
    private barberShopService: BarberShopService,
    private router: Router,
    private toasterHelper: ToasterHelper
  ) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.barber = new BarberShop();
    this.barber.user = new User();
  }

  register(form: NgForm): void {
    if (form.valid) {
      if (!this.isBarber) {
        this.user.profile = PROFILE.USER;
        this.userService.create(this.user).subscribe(response => {
          this.toasterHelper.showSuccess('Sucesso', 'Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        }, () => {
          this.toasterHelper.showError('Erro', 'Erro ao realizar o cadastro!');
        });
      } else {
        this.user.profile = PROFILE.BARBER;
        this.userService.create(this.user).subscribe((user) => {
          this.barber.user = user;
          this.barberShopService.create(this.barber).subscribe((r) => {
            this.toasterHelper.showSuccess('Sucesso', 'Cadastro realizado com sucesso!');
            this.router.navigate(['/login']);
          })
        }, () => {
          this.toasterHelper.showError('Erro', 'Erro ao realizar o cadastro!');
        });
      }
    }
  }

}
