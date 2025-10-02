import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService, RegisterRequest } from '../services/user.service';
import { LoadingSpinnerComponent } from '../components/loading-spinner.component';
import { SuccessMessageComponent } from '../components/success-message.component';

function passwordMinLength(control: AbstractControl): ValidationErrors | null {
  return control.value && control.value.length >= 8 ? null : { minLength: true };
}
function passwordHasNumber(control: AbstractControl): ValidationErrors | null {
  return /[0-9]/.test(control.value) ? null : { number: true };
}
function passwordHasUpper(control: AbstractControl): ValidationErrors | null {
  return /[A-Z]/.test(control.value) ? null : { upper: true };
}
function passwordHasLower(control: AbstractControl): ValidationErrors | null {
  return /[a-z]/.test(control.value) ? null : { lower: true };
}
function passwordHasSymbol(control: AbstractControl): ValidationErrors | null {
  return /[^A-Za-z0-9]/.test(control.value) ? null : { symbol: true };
}

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  imports: [ReactiveFormsModule, CommonModule, LoadingSpinnerComponent, SuccessMessageComponent]
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public isLoading = false;
  public showSuccess = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, passwordMinLength, passwordHasNumber, passwordHasUpper, passwordHasLower, passwordHasSymbol]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  public get email() { return this.registerForm.get('email'); }
  public get username() { return this.registerForm.get('username'); }
  public get password() { return this.registerForm.get('password'); }
  public get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  public get passwordErrors() {
    const errors = this.password?.errors || {};
    return {
      minLength: !errors['minLength'],
      number: !errors['number'],
      upper: !errors['upper'],
      lower: !errors['lower'],
      symbol: !errors['symbol']
    };
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.isLoading = true;

      const registerData: RegisterRequest = {
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword
      };

      this.userService.register(registerData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.showSuccess = true;

          setTimeout(() => {
            this.showSuccess = false;
            setTimeout(() => {
              this.router.navigate(['/signin']);
            }, 300);
          }, 2500);
        },
        error: (error) => {
          this.isLoading = false;

          if (error.status === 409 && error.error?.message) {
            const message = error.error.message;
            if (message.includes('Email')) {
              this.registerForm.controls['email'].setErrors({ inUse: true });
            }
            if (message.includes('Username')) {
              this.registerForm.controls['username'].setErrors({ inUse: true });
            }
          }
          console.error('Registration failed:', error);
        }
      });
    }
  }
}
