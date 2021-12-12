import {Component, ComponentRef, OnInit} from '@angular/core';
import {ServiceOrderModel} from "../../../../../@core/data/ServiceOrderModel";
import {IModalDialog, IModalDialogOptions} from "ngx-modal-dialog";

@Component({
  selector: 'app-cancel-service-order',
  templateUrl: './cancel-service-order.component.html',
  styleUrls: ['./cancel-service-order.component.css']
})
export class CancelServiceOrderComponent implements OnInit {
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

  onCancel(id: number) {
  }
}
