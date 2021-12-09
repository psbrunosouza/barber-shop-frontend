import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BarberShopModel} from "../../../../@core/data/BarberShopModel";
import {BarberShopService} from "../../../../@core/api/barber/barber-shop.service";
import {PackageService} from "../../../../@core/api/packages/package.service";
import {PackageModel} from "../../../../@core/data/PackageModel";
import {ServiceOrderModel} from "../../../../@core/data/ServiceOrderModel";
import {ServiceOrderService} from "../../../../@core/api/service-order/service-order.service";
import {CartService} from "../../../../@core/api/packages/cart.service";

@Component({
  selector: 'app-barber-profile',
  templateUrl: './barber-profile.component.html',
  styleUrls: ['./barber-profile.component.css'],
  providers: [BarberShopService, PackageService, ServiceOrderService]
})
export class BarberProfileComponent implements OnInit {

  barberShopId: number;
  barberShop: BarberShopModel;
  packages: PackageModel[];
  cart: PackageModel[] = [];
  serviceOrder: ServiceOrderModel;

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
