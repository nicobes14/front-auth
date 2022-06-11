import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  registerForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.registerForm.value);
    this.registerForm.reset();
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {}
}
