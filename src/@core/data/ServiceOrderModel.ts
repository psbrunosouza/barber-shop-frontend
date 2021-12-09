import {PackageModel} from "./PackageModel";
import {BarberShopModel} from "./BarberShopModel";
import {DefaultModel} from "./DefaultModel";

export class ServiceOrderModel extends DefaultModel {
  provider: BarberShopModel;
  packages: PackageModel[];
  status: string;
}