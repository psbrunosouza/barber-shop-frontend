import {DefaultModel} from "./DefaultModel";

export class UserModel extends DefaultModel {
  profile: string;
  name: string;
  email: string;
  password: string;
}
