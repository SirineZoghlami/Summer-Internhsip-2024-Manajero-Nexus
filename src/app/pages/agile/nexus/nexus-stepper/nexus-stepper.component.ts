import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NbStepperComponent } from '@nebular/theme';

@Component({
  selector: 'app-nexus-stepper',
  templateUrl: './nexus-stepper.component.html',
  styleUrls: ['./nexus-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NexusStepperComponent {
  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;

  next() {
    this.stepper.next(); // Move to the next step
  }
  prev() {
    if (this.stepper.selectedIndex > 0) {
      this.stepper.previous(); // Move to the previous step
    }
  }

  finish() {
    console.log('Stepper finished');
    // Logic to handle the finish action
  }
}