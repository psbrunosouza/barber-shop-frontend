import {Component, ComponentRef, OnInit} from '@angular/core';
import {IModalDialog, IModalDialogOptions} from "ngx-modal-dialog";
import {ServiceOrderService} from "../../../../../@core/api/service-order/service-order.service";
import {ServiceOrderModel} from "../../../../../@core/data/ServiceOrderModel";
import {ToasterHelper} from "../../../../../@core/helpers/toaster.helper";
import {BarberShopService} from "../../../../../@core/api/barber/barber-shop.service";
import {addMinutes, format, getYear, parseISO} from "date-fns";
import locale from 'date-fns/locale/en-US';


@Component({
  selector: 'app-barber-contract-service',
  templateUrl: './barber-contract-service.component.html',
  styleUrls: ['./barber-contract-service.component.css'],
  providers: [ServiceOrderService, ToasterHelper, BarberShopService]
})
export class BarberContractServiceComponent implements OnInit {

  serviceOrder: ServiceOrderModel;
  closeMethodDialog: any;
  closeAction: any;

  constructor(
    private serviceOrderService: ServiceOrderService,
    private toastHelper: ToasterHelper,
    private barberShopService: BarberShopService
  ) {
  }

  ngOnInit(): void {
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.serviceOrder = new ServiceOrderModel();
    this.serviceOrder = options.data;
    this.closeMethodDialog = options.closeDialogSubject;
    this.closeAction = options.onClose;
  }

  onContractService(): void {
    this.barberShopService.find(this.serviceOrder.provider.id).subscribe((barberShop) => {
      this.serviceOrder.final_service_time = addMinutes(parseISO(String(this.serviceOrder.initial_service_time)), barberShop.average_time);

      this.serviceOrderService.create(this.serviceOrder).subscribe(() => {
        this.toastHelper.showSuccess("Sucesso", "Serviço Contratado com sucesso!");
        this.closeMethodDialog.next();
        this.closeAction();
      }, () => {
        this.toastHelper.showError("Erro", "Erro durante a contratação do serviço, tente novamente!");
        this.closeMethodDialog.next();
        this.closeAction();
      })
    })
  }

  cancel() {
    this.closeMethodDialog.next();
    this.closeAction();
  }

}
