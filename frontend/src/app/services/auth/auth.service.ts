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
  private roles!: string[];

  private isAdmin = false;
  private isAuthenticated = false;

  private authListener = new Subject<boolean>();
  private adminListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  private logIn( result: {token: string, expiresIn: number, roles: {name:string}[]} ) {
    const roles = result.roles.map( ( role ) => role.name );

    this.token = result.token;
    this.roles = roles;
    if (this.token) {
      const { expiresIn } = result;

      const now = new Date();
      const expires = new Date(now.getTime() + (expiresIn * 1000 ));

      this.setAuthTimer(expiresIn);
      this.saveAuthData(this.token, this.roles.toString(), expires);

      this.isAuthenticated = true;
      this.isAdmin = this.roles.includes('admin');
      this.adminListener.next(this.isAdmin);
      this.authListener.next(true);
      this.router.navigate(['/products']);
    }
  }

  private setAuthTimer(duration: number) {
    setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }

  private saveAuthData(token: string, roles: string, expiresDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', roles);
    localStorage.setItem('expires', expiresDate.toISOString());
  }

  private removeAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('expires');
  }

  private getAuthData(): { token: string, roles: string, expires: string } {
    const token = localStorage.getItem('token');
    const roles = localStorage.getItem('roles');
    const expires = localStorage.getItem('expires');

    if (!token || !expires || !roles) return null!;

    return {
      token,
      roles,
      expires
    };
  }

  autoAuth() {
    if (this.getAuthData()) {
      const data = this.getAuthData();
      const now = new Date();
      const expiresIn = new Date(data.expires).getTime() - now.getTime();

      if (expiresIn > 0) {
        this.setAuthTimer(expiresIn / 1000);

        this.token = data.token;
        this.roles = data.roles.split(',');

        this.isAuthenticated = true;
        this.isAdmin = this.roles.includes('admin');
        this.authListener.next(true);
        this.adminListener.next(this.isAdmin);
      }
    } else {
      this.logOut();
    }
  }

  createUser(user: UserModel) {
    return this.http.post<{token:string, expiresIn: number, roles: {name:string}[]}>(`${API_URL}/user`, user).subscribe( ( result ) => {
      this.logIn(result);
    });
  }

  loginUser(email: string, password: string) {
    return this.http.post<{token:string, expiresIn: number, roles: {name:string}[]}>(`${API_URL}/user/login`, {
      email,
      password
    }).subscribe( ( result ) => {
      this.logIn(result);
    });
  }

  logOut() {
    this.token = '';
    this.roles = [];

    this.removeAuthData();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.adminListener.next(this.isAdmin);
    this.authListener.next(false);
    this.router.navigate(['/']);
  }

  getToken() {
    return this.token;
  }

  getAuthListener() {
    return this.authListener.asObservable();
  }

  getAdminListener() {
    return this.adminListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

}
