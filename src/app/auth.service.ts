import { UserModel } from './core/models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setUser } from './context/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any = {};

  user$: Observable<UserModel>;

  constructor(
    private http: HttpClient,
    private storeUser: Store<{ user: UserModel }>
  ) {
    this.user$ = this.storeUser.select('user');
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string | null | undefined, password: string | null | undefined) {
    return this.http.post(`${environment.API_URI}auth/login`, {
      email,
      password,
    });
  }

  register(
    email: string | null | undefined,
    password: string | null | undefined
  ) {
    return this.http.post(`${environment.API_URI}auth/register`, {
      email,
      password,
    });
  }

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    return this.http.get(`${environment.API_URI}users/me`, { headers });
  }

  updateUser(user: any) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    return this.http.patch(`${environment.API_URI}users/me/edit`, user, {
      headers,
    });
  }

  isLoggedIn() {
    if (localStorage.getItem('access_token')) {
      if (this.user.email === '') {
        this.getUser().subscribe((user: any) => {
          this.storeUser.dispatch(setUser(user));
          return true;
        });
        return true;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.user = {};
  }
}
