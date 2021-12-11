import {UserModel} from "./UserModel";
import {Observable} from "rxjs";
import {DefaultModel} from "./DefaultModel";

export class BarberShopModel extends DefaultModel {
  name: string;
  email: string;
  document: string;
  zipcode: string;
  street: string;
  state: string;
  city: string;
  streetNumber: string;
  user: UserModel;
  opening_hour: number;
  closing_hour: number;
  description: string;
  average_time: number;
  image: string;
}

export abstract class BarberShopServiceModel {
  abstract create(barber: BarberShopModel): Observable<BarberShopModel>;
}
