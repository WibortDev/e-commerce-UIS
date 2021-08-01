import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

import { API_URL } from '../api';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token!: string;
  private isAuthenticated = false;
  private authListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  createUser(user: UserModel) {
    return this.http.post<{id:string, token:string}>(`${API_URL}/user`, user).subscribe( ( result ) => {
      this.token = result.token;
      this.router.navigate(['/login']);
    });
  }

  login(email: string, password: string) {
    return this.http.post<{id:string, token:string}>(`${API_URL}/user/login`, {
      email,
      password
    }).subscribe( ( result ) => {
      this.token = result.token;
      if (this.token) {
        this.isAuthenticated = true;
        this.authListener.next(true);
        this.router.navigate(['/products']);
      }
    });
  }

  getToken() {
    return this.token;
  }

  getAuthListener() {
    return this.authListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

}
