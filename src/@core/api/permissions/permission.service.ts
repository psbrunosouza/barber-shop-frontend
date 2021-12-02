import { Injectable } from '@angular/core';
import {User} from "../../data/User";
import {UserService} from "../user/user.service";

enum permissions {
  BARBER = "barber",
  USER = "user"
}

@Injectable()
export class PermissionService {

  constructor(private userService: UserService) { }

  async hasPermission(): Promise<string> {
    const data = await this.userService.profile().toPromise();
    if(data.profile === permissions.BARBER){
      return permissions.BARBER;
    }else{
      return  permissions.USER;
    }
  }
}
