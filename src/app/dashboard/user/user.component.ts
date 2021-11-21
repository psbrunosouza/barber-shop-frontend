import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {User} from "../../../@core/data/User";
import {UserService} from "../../../@core/api/user/user.service";
import {TokenHelper} from "../../../@core/helpers/token.helper";
import {ToasterHelper} from "../../../@core/helpers/toaster.helper";
import {BarberShop} from "../../../@core/data/BarberShop";
import {BarberShopService} from "../../../@core/api/barber/barber-shop.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, ToasterHelper, BarberShopService]
})
export class UserComponent implements OnInit {

  user: User;
  barberShop: BarberShop;
  currentMenuTab: string = 'user';

  constructor(
    private userService: UserService, private toastHelper: ToasterHelper, private barberService: BarberShopService, private tokenHelper: TokenHelper) { }

  ngOnInit(): void {
    this.user = new User();
    this.barberShop = new BarberShop();
    this.barberShop.user = new User();
    this.loadUser();
    this.loadBarberBarber();
  }

  loadUser(): void{
    this.userService.profile().subscribe((profile) => {
      this.user = profile;
    })
  }

  loadBarberBarber(): void{
    if(this.tokenHelper.getBarberId()){
      this.barberService.find(Number(this.tokenHelper.getBarberId())).subscribe((barberShop) => {
        this.barberShop = barberShop;
      })
    }
  }

  changeTab(menu: string): void{
    this.currentMenuTab = menu;
  }

  onSubmit(form: NgForm){
    if(form.valid){
      if(this.user && this.currentMenuTab === 'user'){
        this.userService.update(this.user).subscribe((user) => {
          this.loadBarberBarber();
          this.loadUser();
          this.toastHelper.showSuccess("Sucesso", "Seu perfil foi atualizado com sucesso!")
        }, () => {
          this.toastHelper.showError("Erro", "Erro durante a atualização do perfil, tente novamente!")
        })
      }

      if(this.barberShop && this.currentMenuTab === 'barber'){
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
