import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {PackageModel} from "../../data/PackageModel";
import {filter, find, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<PackageModel[]> = new BehaviorSubject<PackageModel[]>([]);
  cart: PackageModel[] = [];

  constructor() {
    this.cart$.subscribe((cart) => {
      this.cart = cart;
    })
  }

  saveCart(cartItem: PackageModel): void {
    this.cart$.next([...this.cart, cartItem]);
  }

  clearCart(): void {
    this.cart$.next([]);
  }

  removeFromCartById(id: number): void {
    this.cart = this.cart.filter(cartItem => cartItem.id !== id);
    this.cart$.next(this.cart);
  }
}
