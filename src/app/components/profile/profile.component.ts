import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<UserModel>;

  user: UserModel | any = {};

  constructor(
    private storeUser: Store<{ user: UserModel }>,
    private router: Router
  ) {
    this.user$ = this.storeUser.select('user');
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  editProfile(): void {
    this.router.navigate(['me/edit']);
  }

  ngOnInit(): void {}
}
