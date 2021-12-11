import {Component, Input, OnInit} from '@angular/core';
import {BarberShopModel} from "../../../../@core/data/BarberShopModel";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-barber-shop-card',
  templateUrl: './barber-shop-card.component.html',
  styleUrls: ['./barber-shop-card.component.css']
})
export class BarberShopCardComponent implements OnInit {

  @Input() barberShop: BarberShopModel;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  selectBarberShop(id: number): void {
    this.router.navigate(['../profile', id], {relativeTo: this.activatedRoute})
  }
}
