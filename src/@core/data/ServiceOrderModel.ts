import {PackageModel} from "./PackageModel";
import {BarberShopModel} from "./BarberShopModel";
import {DefaultModel} from "./DefaultModel";
import {UserModel} from "./UserModel";

export class ServiceOrderModel extends DefaultModel {
  provider: BarberShopModel;
  packages: PackageModel[];
  requested: UserModel;
  status: string;
  initial_service_time: Date;
  final_service_time: Date;
  name: string;
}
