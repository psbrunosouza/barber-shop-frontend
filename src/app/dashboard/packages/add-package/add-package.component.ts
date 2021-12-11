import {Component, ComponentRef, OnInit} from '@angular/core';
import {IModalDialog, IModalDialogOptions} from "ngx-modal-dialog";
import {PackageModel} from "../../../../@core/data/PackageModel";
import {PackageService} from "../../../../@core/api/packages/package.service";
import {ToasterHelper} from "../../../../@core/helpers/toaster.helper";

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css'],
  providers: [PackageService, ToasterHelper]
})
export class AddPackageComponent implements OnInit {

  packageModel: PackageModel;
  closeMethodDialog: any;
  closeAction: any;

  constructor(
    private packageService: PackageService,
    private toastHelper: ToasterHelper) {
  }

  ngOnInit(): void {
    this.packageModel = new PackageModel();
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.closeMethodDialog = options.closeDialogSubject;
    this.closeAction = options.onClose;
  }

  onSave() {
    this.packageService.create(this.packageModel).subscribe(() => {
      this.toastHelper.showSuccess("Sucesso", "Serviço criado com sucesso!");
      this.closeMethodDialog.next();
      this.closeAction();
    }, () => {
      this.toastHelper.showError("Erro", "Erro durante a criação do serviço, tente novamente!");
      this.closeMethodDialog.next();
      this.closeAction();
    })
  }

  cancel() {
    this.closeMethodDialog.next();
    this.closeAction();
  }

}
