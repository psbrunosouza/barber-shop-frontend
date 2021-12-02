import {Packages} from "./Packages";
import {BarberShop} from "./BarberShop";
import {Default} from "./Default";

export class ServiceOrder extends Default {
  provider: BarberShop;
  packages: Packages[];
}
