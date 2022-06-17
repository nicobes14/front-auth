import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { setUser } from 'src/app/context/actions/user.actions';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    ]),
  });

  fillError: string = '';
  constructor(
    private storeUser: Store<{ user: UserModel }>,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (data: any) => {
            localStorage.setItem('access_token', data.access_token);
            this.authService.getUser().subscribe((user: any) => {
              this.storeUser.dispatch(setUser(user));
              this.router.navigate(['/me']);
            });
          },
          (error: any) => {
            if (error.status === 401) {
              this.fillError = 'Invalid email or password';
              setTimeout(() => {
                this.fillError = '';
              }, 3000);
            }
          }
        );
    } else {
      if (this.loginForm.get('email')?.invalid) {
        this.fillError = 'Invalid email';
        setTimeout(() => {
          this.fillError = '';
        }, 3000);
      } else if (this.loginForm.get('password')?.invalid) {
        this.fillError = 'Invalid password format.';
        setTimeout(() => {
          this.fillError = '';
        }, 3000);
      }
    }
  }

  redirectToRegister(): void {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {}
}
