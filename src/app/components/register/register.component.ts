import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth.service';
import { setToken } from 'src/app/context/actions/token.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<{ access_token: string }>
  ) {}

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    ]),
  });

  onSubmit(): void {
    // Process checkout data here
    this.register();
    this.registerForm.reset();
  }

  register(): void {
    this.authService
      .register(this.registerForm.value.email, this.registerForm.value.password)
      .subscribe((data: any) => {
        this,
          this.store.dispatch(setToken({ access_token: data.access_token }));
        localStorage.setItem('access_token', data.access_token);
        this.router.navigate(['/me']);
      });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {}
}
