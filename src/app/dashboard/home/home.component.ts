import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {ServiceOrderService} from "../../../@core/api/service-order/service-order.service";
import {ServiceOrderModel} from "../../../@core/data/ServiceOrderModel";
import {TokenHelper} from "../../../@core/helpers/token.helper";
import {PackageService} from "../../../@core/api/packages/package.service";
import {intervalToDuration} from "date-fns";

enum SERVICE_STATUS {
  PENDING = 'pending',
  CONCLUDED = 'concluded',
  CANCELED = 'canceled'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ServiceOrderService, TokenHelper, PackageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };


  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Pendentes', 'Concluídos', 'Cancelados'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,0,255,0.3)', 'rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)'],
    },
  ];

  providerId: number | undefined;
  serviceOrders: ServiceOrderModel[] = [];
  data = {
    amount: 0,
    serviceQuantity: 0,
    hours: "",
  }

  constructor(private serviceOrderService: ServiceOrderService, private tokenHelper: TokenHelper, private packageService: PackageService, private cdn: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.providerId = this.tokenHelper.getBarberId();
    this.providerId && this.serviceOrderService.listByProvider(this.providerId)
      .subscribe((serviceOrders) => {
        this.serviceOrders = serviceOrders;

        serviceOrders.map(serviceOrders => serviceOrders.packages).forEach((packageModel) => {
          packageModel.forEach((innerPackage) => {
            this.data.amount = this.data.amount += innerPackage.value;
          })
        })

        let countedHours: any[] = [];

        this.serviceOrders.forEach((serviceOrder) => {
          const sumHours = intervalToDuration({
            start: new Date(serviceOrder.initial_service_time),
            end: new Date(serviceOrder.final_service_time)
          })
          countedHours = [...countedHours, sumHours]
        })

        this.data.hours = (countedHours.map((time) => time.minutes).reduce((acc, cur) => acc + cur) / 60).toFixed();
        this.cdn.detectChanges();
      })

    this.providerId && this.serviceOrderService.listByProvider(this.providerId, SERVICE_STATUS.PENDING).subscribe((serviceOrders) => {
      this.pieChartData[0] = serviceOrders.length;
      this.cdn.detectChanges();
    })

    this.providerId && this.serviceOrderService.listByProvider(this.providerId, SERVICE_STATUS.CONCLUDED).subscribe((serviceOrders) => {
      this.pieChartData[1] = serviceOrders.length;
      this.cdn.detectChanges();
    })

    this.providerId && this.serviceOrderService.listByProvider(this.providerId, SERVICE_STATUS.CANCELED).subscribe((serviceOrders) => {
      this.pieChartData[2] = serviceOrders.length;
      this.cdn.detectChanges();
    })

    this.providerId && this.packageService.offeredServices(this.providerId).subscribe((serviceAmount) => {
      this.data.serviceQuantity = serviceAmount;
      this.cdn.detectChanges();
    })
  }
}
