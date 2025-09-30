import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.html',
  imports: [ReactiveFormsModule, CommonModule]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  showToast = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() { return this.forgotPasswordForm.get('email'); }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;

      setTimeout(() => {
        const formData = this.forgotPasswordForm.value;
        console.log('Reset password email sent to:', formData.email);

        this.isLoading = false;
        this.showToast = true;

        setTimeout(() => {
          this.hideToast();
        }, 5000);

      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  hideToast() {
    this.showToast = false;
  }

  goToSignin() {
    this.router.navigate(['/signin']);
  }

  private markFormGroupTouched() {
    Object.keys(this.forgotPasswordForm.controls).forEach(key => {
      const control = this.forgotPasswordForm.get(key);
      control?.markAsTouched();
    });
  }
}
