import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

import { API_URL } from '../api';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  users: UserModel[] = [];
  usersUpdate = new Subject<UserModel[]>();

  constructor(private http: HttpClient) { }

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

}