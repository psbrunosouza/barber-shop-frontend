import {User} from "./User";

export class Barber{
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  name: string;
  email: string;
  document: string;
  zipconde: string;
  street: string;
  state: string;
  city: string;
  streetNumber: string;
  user: User;
}
