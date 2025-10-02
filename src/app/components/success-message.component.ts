import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="transition-all duration-500 ease-in-out transform"
         *ngIf="isVisible"
         [ngClass]="{
           'opacity-100 scale-100 translate-y-0': isVisible,
           'opacity-0 scale-95 translate-y-2': !isVisible
         }">
      <div class="flex items-center justify-center p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-2xl shadow-lg">
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <div>
            <p class="text-lg font-semibold text-emerald-800">{{ message }}</p>
            <p class="text-sm text-emerald-600">Redirecting to sign in...</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SuccessMessageComponent {
  @Input() isVisible = false;
  @Input() message = 'Success!';
}
