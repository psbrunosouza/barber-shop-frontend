import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BarberShopModel} from "../../../../@core/data/BarberShopModel";
import {BarberShopService} from "../../../../@core/api/barber/barber-shop.service";
import {PackageService} from "../../../../@core/api/packages/package.service";
import {PackageModel} from "../../../../@core/data/PackageModel";
import {ServiceOrderModel} from "../../../../@core/data/ServiceOrderModel";
import {ServiceOrderService} from "../../../../@core/api/service-order/service-order.service";
import {CartService} from "../../../../@core/api/packages/cart.service";

enum SERVICE_STATUS {
  PENDING = 'pending',
  CONCLUDED = 'concluded',
  CANCELED = 'canceled'
}

@Component({
  selector: 'app-barber-profile',
  templateUrl: './barber-profile.component.html',
  styleUrls: ['./barber-profile.component.css'],
  providers: [BarberShopService, PackageService, ServiceOrderService]
})
export class BarberProfileComponent implements OnInit {

  barberShopId: number;
  barberShop: BarberShopModel;
  serviceOrder: ServiceOrderModel;
  packages: PackageModel[];
  cart: PackageModel[] = [];
  activeServiceOrders: ServiceOrderModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private barberShopService: BarberShopService,
    private packageService: PackageService,
    private serviceOrderService: ServiceOrderService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.barberShop = new BarberShopModel();
    this.serviceOrder = new ServiceOrderModel();
    this.serviceOrder.provider = new BarberShopModel();

    this.activatedRoute.params.subscribe((param) => {
      this.barberShopId = param['id'];
      this.loadBarberShops(this.barberShopId);
      this.loadServices(this.barberShopId);
      this.loadActiveOrders(this.barberShopId, SERVICE_STATUS.PENDING)
    })

    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    })
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCartById(id);
  }

  loadActiveOrders(barberId: number, query?: string): void {
    this.serviceOrderService.list(barberId, query).subscribe((activeServiceOrders) => {
      this.activeServiceOrders = activeServiceOrders;
    })
  }

  loadBarberShops(id: number): void {
    this.barberShopService.find(id).subscribe(barberShop => this.barberShop = barberShop)
  }

  loadServices(id: number): void {
    this.packageService.list(id).subscribe(service => this.packages = service)
  }

  contractService() {
    this.serviceOrder.packages = this.cart;
    this.serviceOrder.provider.id = this.barberShopId;


    this.serviceOrderService.create(this.serviceOrder).subscribe((serviceOrder) => {
      console.log(serviceOrder)
    })
  }
}
