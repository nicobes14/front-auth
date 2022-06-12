import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any = {};

  constructor(private http: HttpClient) {}

  login(email: string | null | undefined, password: string | null | undefined) {
    return this.http.post('http://localhost:3000/auth/login', {
      email,
      password,
    });
  }

  register(
    email: string | null | undefined,
    password: string | null | undefined
  ) {
    return this.http.post('http://localhost:3000/auth/register', {
      email,
      password,
    });
  }

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    this.user = {};
  }
}
