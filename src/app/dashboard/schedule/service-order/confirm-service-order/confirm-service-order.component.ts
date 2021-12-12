import {Component, ComponentRef, OnInit} from '@angular/core';
import {ServiceOrderModel} from "../../../../../@core/data/ServiceOrderModel";
import {IModalDialog, IModalDialogOptions} from "ngx-modal-dialog";
import {ServiceOrderService} from "../../../../../@core/api/service-order/service-order.service";
import {ToasterHelper} from "../../../../../@core/helpers/toaster.helper";

@Component({
  selector: 'app-confirm-service-order',
  templateUrl: './confirm-service-order.component.html',
  styleUrls: ['./confirm-service-order.component.css'],
  providers: [ServiceOrderService, ToasterHelper]
})
export class ConfirmServiceOrderComponent implements OnInit {
  closeMethodDialog: any;
  closeAction: any;
  data: ServiceOrderModel;

  constructor(private serviceOrderService: ServiceOrderService, private toaster: ToasterHelper) {
  }

  ngOnInit(): void {
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.data = options.data;
    this.closeMethodDialog = options.closeDialogSubject;
    this.closeAction = options.onClose;
  }

  close() {
    this.closeMethodDialog.next();
    this.closeAction();
  }

  onConfirm(id: number) {
    this.serviceOrderService.confirmService(id).subscribe(() => {
      this.toaster.showSuccess("Sucesso", "Status alterado com sucesso!");
      this.close();
    }, () => {
      this.toaster.showError("Erro", "Não foi possível alterar o status. Tente novamente.");
      this.close();
    })
  }

}
