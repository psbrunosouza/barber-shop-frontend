import {Component, OnInit} from '@angular/core';
import {ToasterHelper} from 'src/@core/helpers/toaster.helper';
import {ServiceOrderModel} from "../../../@core/data/ServiceOrderModel";
import {ServiceOrderService} from "../../../@core/api/service-order/service-order.service";
import {TokenHelper} from "../../../@core/helpers/token.helper";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [ToasterHelper, ServiceOrderService],
})
export class ScheduleComponent implements OnInit {
  serviceOrders: ServiceOrderModel[] = [];


  constructor(private serviceOrderService: ServiceOrderService, private tokenHelper: TokenHelper) {
  }
  ngOnInit(): void {
    this.loadServiceOrder();
  }

  loadServiceOrder() {
     if(this.tokenHelper.getBarberId()) {
      this.serviceOrderService.listByProvider(Number(this.tokenHelper.getBarberId())).pipe(
        map((serviceOrders) => serviceOrders.map((serviceOrder) => ({
          ...serviceOrder,
          name: serviceOrder.requested.name
        })))
      ).subscribe((serviceOrders) => {
      this.serviceOrders = serviceOrders;
    })
    } else if (this.tokenHelper.getUserId()) {
      this.serviceOrderService.listByRequested().pipe(
        map((serviceOrders) => {
        return serviceOrders.map((serviceOrder) => {
            return {
              ...serviceOrder,
              name: serviceOrder.provider.name
            }
          })
        })
      ).subscribe((serviceOrders) => {
       this.serviceOrders = serviceOrders;
      })

     }
  }


}
