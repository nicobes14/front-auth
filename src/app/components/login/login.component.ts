import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.loginForm.value);
    this.loginForm.reset();
  }

  redirectToRegister(): void {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {}
}
