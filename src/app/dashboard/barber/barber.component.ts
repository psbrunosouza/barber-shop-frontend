import {Component, OnInit} from '@angular/core';
import {BarberShopService} from "../../../@core/api/barber/barber-shop.service";
import {BarberShopModel} from "../../../@core/data/BarberShopModel";

@Component({
  selector: 'app-barber',
  templateUrl: './barber.component.html',
  styleUrls: ['./barber.component.css'],
  providers: [BarberShopService]
})
export class BarberComponent implements OnInit {

  barberShops: BarberShopModel[];

  constructor(
    private barberShopService: BarberShopService,
  ) {
  }

  ngOnInit(): void {
    this.loadBarberShops();
  }

  loadBarberShops(): void {
    this.barberShopService.list().subscribe(barberShop => this.barberShops = barberShop)
  }
}
