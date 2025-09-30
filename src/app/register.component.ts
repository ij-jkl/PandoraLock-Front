import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, passwordMinLength, passwordHasNumber, passwordHasUpper, passwordHasLower, passwordHasSymbol]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  get email() { return this.registerForm.get('email'); }
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  get passwordErrors() {
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
      this.router.navigate(['/register']);
    }
  }
}
