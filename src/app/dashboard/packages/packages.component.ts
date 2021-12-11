import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {PackageModel} from "../../../@core/data/PackageModel";
import {PackageService} from "../../../@core/api/packages/package.service";
import {ToasterHelper} from "../../../@core/helpers/toaster.helper";
import {TokenHelper} from "../../../@core/helpers/token.helper";
import {PackageListService} from "./package-list.service";
import {DeletePackageComponent} from "./delete-package/delete-package.component";
import {ModalDialogService} from "ngx-modal-dialog";
import {AddPackageComponent} from "./add-package/add-package.component";

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
    private serviceList: PackageListService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    private packageListService: PackageListService,
  ) {
  }

  ngOnInit()
    :
    void {
    this.package = new PackageModel();
    this.loadPackages();

    this.serviceList.refreshPackageList$.subscribe(() => {
      this.loadPackages();
    })
  }

  openAddDialog() {
    this.modalService.openDialog(this.viewRef, {
        title: 'Adicionar Pacote',
        childComponent: AddPackageComponent,
        onClose: () => {
          this.packageListService.handleRefreshPackageList()
          return true;
        }
      }
    )
  }

  loadPackages() {
    if (this.tokenHelper.getBarberId()) this.packageService.list(Number(this.tokenHelper.getBarberId()))
      .subscribe((packages) => {
        this.packages = packages;
      });
  }
}
