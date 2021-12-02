import {User} from "./User";
import {Observable} from "rxjs";
import {Default} from "./Default";

export class BarberShop extends Default {
  name: string;
  email: string;
  document: string;
  zipcode: string;
  street: string;
  state: string;
  city: string;
  streetNumber: string;
  user: User;
  // start: string; TODO: insert new data
  // end: string;
  // avg: number;
}

export abstract class BarberShopServiceModel {
  abstract create(barber: BarberShop): Observable<BarberShop>;
}
