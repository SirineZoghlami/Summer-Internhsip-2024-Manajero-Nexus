import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  template: `
    <div *ngIf="control.invalid && (control.dirty || control.touched)" class="error-message">
      <div *ngIf="control.errors?.required">This field is required</div>
      <!-- Add other validation error messages as needed -->
    </div>
  `,
  styles: [`
    .error-message {
      color: red;
      font-size: 0.875em;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() control: FormControl;
}
