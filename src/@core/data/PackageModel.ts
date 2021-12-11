import {DefaultModel} from "./DefaultModel";

export class PackageModel extends DefaultModel {
  name: string;
  value: number;
  description: string;
  image: string;
  tag: string;
  time: number;
}
