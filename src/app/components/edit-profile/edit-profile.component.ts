import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { updateUser } from 'src/app/context/actions/user.actions';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  user$: Observable<UserModel>;
  user: UserModel | any = {};

  editForm = new FormGroup({
    email: new FormControl(this.user.email, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    ]),
    name: new FormControl(this.user.name, [Validators.required]),
    phone: new FormControl(this.user.phone, [Validators.required]),
    bio: new FormControl(this.user.bio, [Validators.required]),
    photo: new FormControl(),
  });

  constructor(
    private router: Router,
    private storeUser: Store<{ user: UserModel }>,
    private authService: AuthService
  ) {
    this.user$ = storeUser.select('user');
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  onSubmit(): void {
    // Process checkout data here
    const { photo, ...userFromForm } = this.editForm.value;
    this.authService
      .updateUser({ photo: this.user.photo, ...userFromForm })
      .subscribe((user: any) => {
        this.storeUser.dispatch(updateUser(user));
        this.router.navigate(['/me']);
      });

    this.editForm.reset();
  }

  ngOnInit(): void {
    this.editForm.patchValue(this.user);
  }
}
