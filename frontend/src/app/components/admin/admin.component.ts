import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit, OnDestroy {
  users: UserModel[] = [];
  usersSubscription!: Subscription;

  constructor(public adminService: AdminService) {}

  ngOnInit(): void {
    this.users = this.adminService.getUsers();
    this.usersSubscription = this.adminService.getUserUpdate().subscribe((users: UserModel[]) => {
      this.users = users;

      this.users.map((user: UserModel) => {
        const roles: string[] = [];
        user.roles?.map(( role ) => {
          roles.push( role.name )
        });

        user.permiso = roles;
      });

      console.log( this.users );

    });
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

}
