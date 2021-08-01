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

  private logIn( result: {token: string, expiresIn: number} ) {
    this.token = result.token;
    if (this.token) {
      const { expiresIn } = result;

      const now = new Date();
      const expires = new Date(now.getTime() + (expiresIn * 1000 ));

      this.setAuthTimer(expiresIn);
      this.saveAuthData(this.token, expires);

      this.isAuthenticated = true;
      this.authListener.next(true);
      this.router.navigate(['/products']);
    }
  }

  private setAuthTimer(duration: number) {
    setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expiresDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expires', expiresDate.toISOString());
  }

  private removeAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
  }

  private getAuthData(): { token: string, expires: string } {
    const token = localStorage.getItem('token');
    const expires = localStorage.getItem('expires');

    if (!token || !expires) return null!;

    return {
      token,
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
        this.isAuthenticated = true;
        this.authListener.next(true);
      }
    }
  }

  createUser(user: UserModel) {
    return this.http.post<{id:string, token:string, expiresIn: number}>(`${API_URL}/user`, user).subscribe( ( result ) => {
      this.logIn(result);
    });
  }

  loginUser(email: string, password: string) {
    return this.http.post<{id:string, token:string, expiresIn: number}>(`${API_URL}/user/login`, {
      email,
      password
    }).subscribe( ( result ) => {
      this.logIn(result);
    });
  }

  logOut() {
    this.token = '';
    this.removeAuthData();
    this.isAuthenticated = false;
    this.authListener.next(false);
    this.router.navigate(['/']);
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
