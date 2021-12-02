import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BarberShop} from "../../../../@core/data/BarberShop";
import {BarberShopService} from "../../../../@core/api/barber/barber-shop.service";
import {PackageService} from "../../../../@core/api/packages/package.service";
import {Packages} from "../../../../@core/data/Packages";
import {ServiceOrder} from "../../../../@core/data/ServiceOrder";
import {ServiceOrderService} from "../../../../@core/api/service-order/service-order.service";

@Component({
  selector: 'app-barber-profile',
  templateUrl: './barber-profile.component.html',
  styleUrls: ['./barber-profile.component.css'],
  providers: [BarberShopService, PackageService, ServiceOrderService]
})
export class BarberProfileComponent implements OnInit {

  barberShopId: number;
  barberShop: BarberShop;
  packages: Packages[];
  cart: Packages[] = [];
  serviceOrder: ServiceOrder;

  constructor(
    private activatedRoute: ActivatedRoute,
    private barberShopService: BarberShopService,
    private packageService: PackageService,
    private serviceOrderService: ServiceOrderService,
  ) {
  }

  ngOnInit(): void {
    this.barberShop = new BarberShop();
    this.serviceOrder = new ServiceOrder();
    this.serviceOrder.provider = new BarberShop();

    this.activatedRoute.params.subscribe((param) => {
      this.barberShopId = param['id'];
      this.loadBarberShops(this.barberShopId);
      this.loadServices(this.barberShopId);
    })
  }

  packageExistsIntoCart(packageModel: Packages): boolean {
    return !!this.cart.find(value => value.id === packageModel.id);
  }

  addToCart(packageModel: Packages): void {
    if (!this.packageExistsIntoCart(packageModel)) {
      this.cart = [...this.cart, packageModel];
    }
  }

  clearCart(): void {
    this.cart = [];
  }

  removeToCart(packageModel: Packages): void {
    this.cart = this.cart.filter(service => service.id !== packageModel.id);
  }

  loadBarberShops(id: number): void {
    this.barberShopService.find(id).subscribe(barberShop => this.barberShop = barberShop)
  }

  loadServices(id: number): void {
    this.packageService.list(id).subscribe(service => this.packages = service)
  }

  onCreate() {
    this.serviceOrder.packages = this.cart;
    this.serviceOrder.provider.id = this.barberShopId;

    this.serviceOrderService.create(this.serviceOrder).subscribe((serviceOrder) => {
      console.log(serviceOrder);
    })
  }
}
