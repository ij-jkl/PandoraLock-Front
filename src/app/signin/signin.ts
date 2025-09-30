import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private router: Router) {
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

      // Simular autenticación
      setTimeout(() => {
        const formData = this.signinForm.value;

        // Aquí iría la lógica de autenticación real
        console.log('Signin data:', formData);

        // Simular respuesta exitosa o error
        const mockSuccess = Math.random() > 0.3; // 70% de éxito

        if (mockSuccess) {
          console.log('Signin successful');
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Invalid email or password. Please try again.';
        }

        this.isLoading = false;
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  private markFormGroupTouched() {
    Object.keys(this.signinForm.controls).forEach(key => {
      const control = this.signinForm.get(key);
      control?.markAsTouched();
    });
  }
}
