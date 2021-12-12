import {Component, ComponentRef, OnInit} from '@angular/core';
import {ServiceOrderModel} from "../../../../../@core/data/ServiceOrderModel";
import {IModalDialog, IModalDialogOptions} from "ngx-modal-dialog";
import {ServiceOrderService} from "../../../../../@core/api/service-order/service-order.service";
import {ToasterHelper} from "../../../../../@core/helpers/toaster.helper";
import {ScheduleService} from "../../schedule.service";

@Component({
  selector: 'app-cancel-service-order',
  templateUrl: './cancel-service-order.component.html',
  styleUrls: ['./cancel-service-order.component.css'],
  providers: [ServiceOrderService, ToasterHelper]
})
export class CancelServiceOrderComponent implements OnInit {
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

  onCancel(id: number) {
    this.serviceOrderService.cancelService(id).subscribe(() => {
      this.toaster.showSuccess("Sucesso", "Status alterado com sucesso!");
      this.close();
    }, () => {
      this.toaster.showError("Erro", "Não foi possível alterar o status. Tente novamente.");
      this.close();
    })
  }
}
