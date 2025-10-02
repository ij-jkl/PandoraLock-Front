import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center" *ngIf="isVisible">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      <span class="ml-2 text-blue-600">{{ message }}</span>
    </div>
  `
})
export class LoadingSpinnerComponent {
  @Input() isVisible = false;
  @Input() message = 'Loading...';
}
