import {Component, ComponentRef, OnInit} from '@angular/core';
import {IModalDialog, IModalDialogOptions} from "ngx-modal-dialog";

@Component({
  selector: 'app-barber-contract-service',
  templateUrl: './barber-contract-service.component.html',
  styleUrls: ['./barber-contract-service.component.css']
})
export class BarberContractServiceComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {

  }

}
