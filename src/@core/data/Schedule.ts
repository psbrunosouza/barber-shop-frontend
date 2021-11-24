import { User } from './User';

export class Schedule {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  name: string;
  description: string;
  user: User;
}
