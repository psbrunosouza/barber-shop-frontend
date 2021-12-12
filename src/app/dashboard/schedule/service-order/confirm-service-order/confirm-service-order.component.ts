import {Component, ComponentRef, OnInit} from '@angular/core';
import {ServiceOrderModel} from "../../../../../@core/data/ServiceOrderModel";
import {IModalDialog, IModalDialogOptions} from "ngx-modal-dialog";

@Component({
  selector: 'app-confirm-service-order',
  templateUrl: './confirm-service-order.component.html',
  styleUrls: ['./confirm-service-order.component.css']
})
export class ConfirmServiceOrderComponent implements OnInit {
  closeMethodDialog: any;
  closeAction: any;
  data: ServiceOrderModel;

  constructor() { }

  ngOnInit(): void {
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    this.data = options.data;
    this.closeMethodDialog = options.closeDialogSubject;
    this.closeAction = options.onClose;
  }

  cancel() {
    this.closeMethodDialog.next();
    this.closeAction();
  }

  onConfirm(id: number) {
  }

}
