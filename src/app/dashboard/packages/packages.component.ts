import { Component, OnInit } from '@angular/core';
import {Packages} from "../../../@core/data/Packages";
import {NgForm} from "@angular/forms";
import {PackageService} from "../../../@core/api/packages/package.service";
import {ToasterHelper} from "../../../@core/helpers/toaster.helper";
import {BarberShopService} from "../../../@core/api/barber/barber-shop.service";
import {TokenHelper} from "../../../@core/helpers/token.helper";

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  providers: [PackageService, ToasterHelper]
})
export class PackagesComponent implements OnInit {

  package: Packages;
  packages: Packages[];

  constructor(
    private packageService: PackageService,
    private toastHelper: ToasterHelper,
    private tokenHelper: TokenHelper
  ) { }

  ngOnInit(): void {
    this.package = new Packages();
    this.loadPackages();
  }

  loadPackages(){
    if(this.tokenHelper.getBarberId()) this.packageService.list(Number(this.tokenHelper.getBarberId()))
      .subscribe((packages) => {
      this.packages = packages;
    });
  }

  onSubmit(form: NgForm){
    if(form.valid){
      this.packageService.create(this.package).subscribe(() => {
        this.toastHelper.showSuccess("Sucesso", "Serviço criado com sucesso!");
      }, () => {
        this.toastHelper.showError("Erro", "Erro durante a criação do serviço, tente novamente!")
      })
    }
  }

}
