import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ServiceOrderModel} from "../../../../@core/data/ServiceOrderModel";
import {TokenHelper} from "../../../../@core/helpers/token.helper";
import {ModalDialogService} from "ngx-modal-dialog";
import {ConfirmServiceOrderComponent} from "./confirm-service-order/confirm-service-order.component";
import {CancelServiceOrderComponent} from "./cancel-service-order/cancel-service-order.component";
import {ScheduleService} from "../schedule.service";

@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.css'],
  providers: [TokenHelper]
})
export class ServiceOrderComponent implements OnInit {
  @Input() ServiceOrders: ServiceOrderModel[] = [];
  providerId: number | undefined;
  serviceOrderStatus: any = {
    'pending': {status: 'Pendente', color: 'bg-warning'},
    'concluded': {status: 'Concluído', color: 'bg-success'},
    'canceled': {status: 'Cancelado', color: 'bg-danger'}
  };

  constructor(private tokenHelper: TokenHelper, private modalService: ModalDialogService, private viewRef: ViewContainerRef, private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    this.providerId = this.tokenHelper.getBarberId();
  }

  openConfirmDialog(serviceOrder: ServiceOrderModel) {
    this.modalService.openDialog(this.viewRef, {
        title: 'Concluir atendimento',
        data: serviceOrder,
        childComponent: ConfirmServiceOrderComponent,
        onClose: () => {
          this.scheduleService.handleRefreshScheduleList();
          return true;
        }
      }
    )
  }

  openCancelDialog(serviceOrder: ServiceOrderModel) {
    this.modalService.openDialog(this.viewRef, {
        title: 'Cancelar atendimento',
        data: serviceOrder,
        childComponent: CancelServiceOrderComponent,
        onClose: () => {
          this.scheduleService.handleRefreshScheduleList();
          return true;
        }
      }
    )
  }

}
