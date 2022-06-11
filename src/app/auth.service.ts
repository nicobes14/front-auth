import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any = {};

  constructor() {}

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return !!this.user.id;
  }

  logout() {
    this.user = {};
  }
}
