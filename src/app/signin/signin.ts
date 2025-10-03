import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.html',
  imports: [ReactiveFormsModule, CommonModule]
})
export class SigninComponent {
  signinForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  get email() { return this.signinForm.get('email'); }
  get password() { return this.signinForm.get('password'); }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = {
        usernameOrEmail: this.signinForm.value.email,
        password: this.signinForm.value.password
      };

      this.userService.login(credentials).subscribe({
        next: (response) => {
          console.log('Signin successful:', response);
          localStorage.setItem('user', JSON.stringify(response.response));
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Signin error:', error);
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Invalid email or password. Please try again.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  private markFormGroupTouched() {
    Object.keys(this.signinForm.controls).forEach(key => {
      const control = this.signinForm.get(key);
      control?.markAsTouched();
    });
  }
}
