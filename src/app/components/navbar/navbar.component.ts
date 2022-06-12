import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { clearToken } from 'src/app/context/actions/token.actions';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  token$: Observable<string>;

  token: string = '';

  showMenu = false;

  constructor(
    private store: Store<{ access_token: string }>,
    private router: Router,
    public authService: AuthService
  ) {
    this.token$ = this.store.select('access_token');
  }

  goToMyProfile(): void {
    this.router.navigate(['/me']);
  }

  goToChats(): void {
    console.log('no implemented yet');
  }

  changeMenuState(): void {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {}
}
