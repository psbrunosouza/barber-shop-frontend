import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Packages} from "../../../@core/data/Packages";
import {NgForm} from "@angular/forms";
import {PackageService} from "../../../@core/api/packages/package.service";
import {ToasterHelper} from "../../../@core/helpers/toaster.helper";
import {TokenHelper} from "../../../@core/helpers/token.helper";
import {ModalDialogService} from "ngx-modal-dialog";
import {DeletePackageComponent} from "./delete-package/delete-package.component";
import {EditPackageComponent} from "./edit-package/edit-package.component";

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
    private tokenHelper: TokenHelper,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef
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

  openDeleteDialog(data: Packages){
   this.modalService.openDialog(this.viewRef, {
      title: 'Deletar Pacote',
      childComponent: DeletePackageComponent,
      data: data,
      onClose: () => {
        this.loadPackages();
        return true;
      }
     }
   )
  }


  openUpdateDialog(data: Packages){
    this.modalService.openDialog(this.viewRef, {
        title: 'Atualizar Pacote',
        childComponent: EditPackageComponent,
        data: data,
        onClose: () => {
          this.loadPackages();
          return true;
        }
      }
    )
  }

  onSubmit(form: NgForm){
    if(form.valid){
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
