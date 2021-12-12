import {Component, ComponentRef, OnDestroy, OnInit} from '@angular/core';
import {IModalDialog, IModalDialogOptions} from "ngx-modal-dialog";
import {PackageModel} from "../../../../@core/data/PackageModel";
import {PackageService} from "../../../../@core/api/packages/package.service";
import {ToasterHelper} from "../../../../@core/helpers/toaster.helper";
import {NgForm} from "@angular/forms";
import {TokenHelper} from "../../../../@core/helpers/token.helper";

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.css'],
  providers: [PackageService, ToasterHelper]
})
export class EditPackageComponent implements OnInit {
  packageId: number;
  data: PackageModel;
  closeMethodDialog: any;
  closeAction: any;

  constructor(
    private packageService: PackageService,
    private toastHelper: ToasterHelper,
    private tokenHelper: TokenHelper,
  ) {
  }

  ngOnInit(): void {
    this.data = new PackageModel();
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.packageId = options.data;
    this.closeMethodDialog = options.closeDialogSubject;
    this.closeAction = options.onClose;
    this.showPackage();
  }

  cancel() {
    this.closeMethodDialog.next();
    this.closeAction();
  }

  showPackage() {
    if (this.tokenHelper.getBarberId()) this.packageService.show(this.packageId)
      .subscribe((packages) => {
        this.data = packages;
      });
  }

  onUpdate(id: number, packageModel: PackageModel, form: NgForm) {
    this.packageService.update(id, packageModel).subscribe(() => {
      this.toastHelper.showSuccess("Sucesso", "Serviço alterado com sucesso!");
      this.closeMethodDialog.next();
      this.closeAction();
      form.reset();
    }, () => {
      this.toastHelper.showError("Erro", "Erro durante a deleção do serviço, tente novamente!");
      this.closeMethodDialog.next();
      this.closeAction();
      form.reset();
    })
  }
}
