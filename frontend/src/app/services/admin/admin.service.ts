import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

import { API_URL } from '../api';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  users: UserModel[] = [];
  usersUpdate = new Subject<UserModel[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getUsers() {
    this.http.get<UserModel[]>(`${API_URL}/user`).subscribe( (response) => {
      this.users = response;
      this.usersUpdate.next([...this.users]);
    });

    return [...this.users];
  }

  getUserUpdate() {
    return this.usersUpdate.asObservable();
  }

  removeUser(id: string | undefined) {
    this.http.delete(`${API_URL}/user/${id}`).subscribe( (response) => {
      this.users = this.users.filter( (user) => user._id !== id );
      this.usersUpdate.next([...this.users]);
    } );
  }

  removeAdmin( id: string | undefined ) {
    this.http.delete(`${API_URL}/user/admin/${id}`).subscribe( (response) => {
      this.getUsers();
    } );
  }

  giveAdmin( id: string | undefined ) {
    this.http.put(`${API_URL}/user/admin/${id}`, {}).subscribe( (response) => {
      this.getUsers();
    } );
  }

}
