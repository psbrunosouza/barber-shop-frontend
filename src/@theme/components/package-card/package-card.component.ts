import {Component, Input, OnInit} from '@angular/core';
import {PackageModel} from "../../../@core/data/PackageModel";
import {CartService} from "../../../@core/api/packages/cart.service";

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.css']
})
export class PackageCardComponent implements OnInit {
  @Input() packageModel: PackageModel;
  cart: PackageModel[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => this.cart = cart);
  }

  addToCart(packageModel: PackageModel): void {
    if (!this.cart.find(item => item.id === packageModel.id)) this.cartService.saveCart(packageModel);
  }
}
