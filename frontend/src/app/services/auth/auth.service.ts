import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';

import { API_URL } from '../api';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  createUser(user: UserModel) {
    return this.http.post(`${API_URL}/user`, user).subscribe( ( result ) => {
      console.log(result);
    });
  }

  login(email: string, password: string) {
    return this.http.post(`${API_URL}/user/login`, {
      email,
      password
    }).subscribe( ( result ) => {
      console.log( result );
    });
  }

}
