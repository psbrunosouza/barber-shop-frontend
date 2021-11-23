import {Component, ComponentRef,OnInit} from '@angular/core';
import {IModalDialog, IModalDialogOptions} from "ngx-modal-dialog";
import {Packages} from "../../../../@core/data/Packages";
import {PackageService} from "../../../../@core/api/packages/package.service";
import {ToasterHelper} from "../../../../@core/helpers/toaster.helper";

@Component({
  selector: 'app-delete-package',
  templateUrl: './delete-package.component.html',
  styleUrls: ['./delete-package.component.css'],
  providers: [PackageService, ToasterHelper ]
})
export class DeletePackageComponent implements OnInit {
  data: Packages;
  closeMethodDialog: any;
  closeAction: any;

  constructor(
    private packageService: PackageService,
    private toastHelper: ToasterHelper,
  ) {

  }

  ngOnInit(): void {}

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>> ) {
    this.data = options.data;
    this.closeMethodDialog = options.closeDialogSubject;
    this.closeAction = options.onClose;
  }

  cancel(){
    this.closeMethodDialog.next();
    this.closeAction();
  }

  onDelete(id: number){
    this.packageService.delete(id).subscribe(() => {
      this.toastHelper.showSuccess("Sucesso", "Serviço removido com sucesso!");
      this.closeMethodDialog.next();
      this.closeAction();
    }, () => {
      this.toastHelper.showError("Erro", "Erro durante a deleção do serviço, tente novamente!");
      this.closeMethodDialog.next();
      this.closeAction();
    })
  }
}
