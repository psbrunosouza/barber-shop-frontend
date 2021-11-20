import {User} from "./User";
import {Observable} from "rxjs";

export class BarberShop {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  name: string;
  email: string;
  document: string;
  zipcode: string;
  street: string;
  state: string;
  city: string;
  streetNumber: string;
  user: User;
}

export abstract class BarberShopServiceModel {
  abstract create(barber: BarberShop):  Observable<BarberShop>;
}
