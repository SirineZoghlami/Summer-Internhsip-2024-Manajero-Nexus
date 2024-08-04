import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nexus-stepper',
  templateUrl: './nexus-stepper.component.html',
  styleUrls: ['./nexus-stepper.component.scss']
})
export class NexusStepperComponent implements OnInit {
  projectForm: FormGroup;
  selectedIndex: number = 0;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      projectName: [''],
      description: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {}

  next() {
    this.selectedIndex = Math.min(this.selectedIndex + 1, 3); // Adjust 3 to the number of steps you have
  }

  prev() {
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
  }

  onStepChange(event: any) {
    this.selectedIndex = event.index;
  }

  // Finish method to be called when clicking the 'Finish' button
  finish() {
    // Add your finish logic here
    console.log('Nexus process is complete.');
  }
}
