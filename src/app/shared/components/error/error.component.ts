import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, MessageModule],
  template: `
    @if (errorMessages.length > 0) {
      <div class="error-container">
        @for (message of errorMessages; track message) {
          <p-message severity="error" [text]="message"></p-message>
        }
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .error-container {
      padding: 1rem;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      height: 100%;
      overflow-y: auto;
    }

    :host ::ng-deep .p-message {
      display: block;
      width: 100%;
      margin-bottom: 0.5rem;
    }

    :host ::ng-deep .p-message:last-child {
      margin-bottom: 0;
    }
  `]
})
export class ErrorComponent {
  @Input() set errorMessage(value: string) {
    this.errorMessages = value.split('.').filter(msg => msg.trim() !== '');
  }

  errorMessages: string[] = [];
}
