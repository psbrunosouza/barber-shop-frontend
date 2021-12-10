import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {PackageModel} from "../../../@core/data/PackageModel";
import {NgForm} from "@angular/forms";
import {PackageService} from "../../../@core/api/packages/package.service";
import {ToasterHelper} from "../../../@core/helpers/toaster.helper";
import {TokenHelper} from "../../../@core/helpers/token.helper";
import {ModalDialogService} from "ngx-modal-dialog";
import {DeletePackageComponent} from "./delete-package/delete-package.component";
import {EditPackageComponent} from "./edit-package/edit-package.component";
import {PackageListService} from "./package-list.service";

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  providers: [PackageService, ToasterHelper]
})
export class PackagesComponent implements OnInit {

  package: PackageModel;
  packages: PackageModel[];

  constructor(
    private packageService: PackageService,
    private tokenHelper: TokenHelper,
    private toastHelper: ToasterHelper,
    private serviceList: PackageListService
  ) {
  }

  ngOnInit(): void {
    this.package = new PackageModel();
    this.loadPackages();

    this.serviceList.refreshPackageList$.subscribe(() => {
      this.loadPackages();
    })
  }

  loadPackages() {
    if (this.tokenHelper.getBarberId()) this.packageService.list(Number(this.tokenHelper.getBarberId()))
      .subscribe((packages) => {
        this.packages = packages;
      });
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      this.packageService.create(this.package).subscribe(() => {
        this.toastHelper.showSuccess("Sucesso", "Serviço criado com sucesso!");
        this.loadPackages();
        form.reset();
      }, () => {
        this.toastHelper.showError("Erro", "Erro durante a criação do serviço, tente novamente!")
        this.loadPackages()
        form.reset();
      })
    }
  }

}
