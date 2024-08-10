import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Sprint } from '../../../../../models/nexus-proejct-model'; // Adjust the path accordingly

@Component({
  selector: 'app-sprint-modal',
  templateUrl: './sprint-modal.component.html',
  styleUrls: ['./sprint-modal.component.scss']
})
export class SprintModalComponent {
  newSprint: Sprint = {
    number: 0, // Default or generated value
    startDate: new Date().toISOString().split('T')[0], // Convert Date to ISO string (YYYY-MM-DD)
    endDate: new Date().toISOString().split('T')[0], 
    completed: false,  // Convert Date to ISO string (YYYY-MM-DD)
  };

  constructor(protected dialogRef: NbDialogRef<SprintModalComponent>) {}

  save() {
    this.dialogRef.close(this.newSprint);
  }

  cancel() {
    this.dialogRef.close();
  }
}