import {Component, OnInit} from '@angular/core';
import {BarberShopService} from "../../../@core/api/barber/barber-shop.service";
import {BarberShop} from "../../../@core/data/BarberShop";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-barber',
  templateUrl: './barber.component.html',
  styleUrls: ['./barber.component.css'],
  providers: [BarberShopService]
})
export class BarberComponent implements OnInit {

  barberShops: BarberShop[];

  constructor(
    private barberShopService: BarberShopService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadBarberShops();
  }

  selectBarberShop(id: number): void {
    this.router.navigate(['../profile', id], {relativeTo: this.activatedRoute})
  }

  loadBarberShops(): void {
    this.barberShopService.list().subscribe(barberShop => this.barberShops = barberShop)
  }
}
