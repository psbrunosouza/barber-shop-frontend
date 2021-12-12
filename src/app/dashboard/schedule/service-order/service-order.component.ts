import {Component, Input, OnInit} from '@angular/core';
import {ServiceOrderModel} from "../../../../@core/data/ServiceOrderModel";

@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.css']
})
export class ServiceOrderComponent implements OnInit {
  @Input() ServiceOrders: ServiceOrderModel[] = [];

  serviceOrderStatus: any = {
    'pending':  'pendente',
    'concluded': 'concluído',
    'canceled':  'cancelado'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
