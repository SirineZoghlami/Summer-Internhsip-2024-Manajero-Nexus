import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() control: FormControl;

  get errorMessage(): string {
    if (this.control.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }


  ngOnChanges() {
    console.log('Control:', this.control);
    console.log('Errors:', this.control?.errors);
  }
}
