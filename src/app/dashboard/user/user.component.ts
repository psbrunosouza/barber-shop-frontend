import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserModel} from "../../../@core/data/UserModel";
import {UserService} from "../../../@core/api/user/user.service";
import {TokenHelper} from "../../../@core/helpers/token.helper";
import {ToasterHelper} from "../../../@core/helpers/toaster.helper";
import {BarberShopModel} from "../../../@core/data/BarberShopModel";
import {BarberShopService} from "../../../@core/api/barber/barber-shop.service";
import {PermissionService} from "../../../@core/api/permissions/permission.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, ToasterHelper, BarberShopService, PermissionService]
})
export class UserComponent implements OnInit {

  user: UserModel;
  barberShop: BarberShopModel;
  currentMenuTab: string = 'user';
  permission: string;

  constructor(
    private userService: UserService,
    private toastHelper: ToasterHelper,
    private barberService: BarberShopService,
    private tokenHelper: TokenHelper,
    private permissionService: PermissionService
  ) {
  }

  ngOnInit(): void {
    this.user = new UserModel();
    this.barberShop = new BarberShopModel();
    this.barberShop.user = new UserModel();
    this.loadUser();
    this.loadBarberBarber();
    this.permissionService.hasPermission().then((permission) => {
      this.permission = permission;
    })
  }

  loadUser(): void {
    this.userService.profile().subscribe((profile) => {
      this.user = profile;
    })
  }

  loadBarberBarber(): void {
    if (this.tokenHelper.getBarberId()) {
      this.barberService.find(Number(this.tokenHelper.getBarberId())).subscribe((barberShop) => {
        this.barberShop = barberShop;
      })
    }
  }

  changeTab(menu: string): void {
    this.currentMenuTab = menu;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.user && this.currentMenuTab === 'user') {
        this.userService.update(this.user).subscribe((user) => {
          this.loadBarberBarber();
          this.loadUser();
          this.toastHelper.showSuccess("Sucesso", "Seu perfil foi atualizado com sucesso!")
        }, () => {
          this.toastHelper.showError("Erro", "Erro durante a atualização do perfil, tente novamente!")
        })
      }

      if (this.barberShop && this.currentMenuTab === 'barber') {
        this.barberService.update(this.barberShop).subscribe(() => {
          this.loadBarberBarber();
          this.loadUser();
          this.toastHelper.showSuccess("Sucesso", "Estabelecimento atualizado com sucesso!");
        }, () => {
          this.toastHelper.showError("Erro", "Erro durante a atualização do estabelecimento, tente novamente!")
        })
      }
    }
  }
}
