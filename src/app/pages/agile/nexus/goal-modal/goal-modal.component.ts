import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NexusGoal } from '../../../../../models/nexus-proejct-model'; // Adjust the path accordingly

@Component({
  selector: 'app-goal-modal',
  templateUrl: './goal-modal.component.html',
  styleUrls: ['./goal-modal.component.scss']
})
export class GoalModalComponent {
  newGoal: NexusGoal = {
  
    content: ''
  };

  constructor(protected dialogRef: NbDialogRef<GoalModalComponent>) {}

  save() {
    this.dialogRef.close(this.newGoal);
  }

  cancel() {
    this.dialogRef.close();
  }
}
