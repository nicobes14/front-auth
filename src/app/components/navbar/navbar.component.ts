import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: UserModel | any = {};

  showMenu = false;

  user$: Observable<UserModel>;

  constructor(
    private storeUser: Store<{ user: UserModel }>,
    private router: Router,
    public authService: AuthService
  ) {
    this.user$ = this.storeUser.select('user');
    this.user$.subscribe((user) => {
      this.user = user;
    });
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

  ngOnInit(): void {
    this.showMenu = false;
  }
}
