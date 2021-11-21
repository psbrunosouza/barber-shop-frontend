import { Component, OnInit } from '@angular/core';
import {PermissionService} from "../../../@core/api/permissions/permission.service";
import {UserService} from "../../../@core/api/user/user.service";

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css'],
  providers: [PermissionService, UserService]
})
export class DashboardSidebarComponent implements OnInit {

  permission: string;

  constructor(private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.permissionService.hasPermission().then((permission) => {
      this.permission = permission;
    })
  }

}
