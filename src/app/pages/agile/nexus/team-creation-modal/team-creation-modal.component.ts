import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-team-creation-modal',
  templateUrl: './team-creation-modal.component.html',
  styleUrls: ['./team-creation-modal.component.scss']
})
export class TeamCreationModalComponent {

  team = {
    name: '',
    members: '',
    roles: '',

  };

  constructor(protected dialogRef: NbDialogRef<TeamCreationModalComponent>) {}

  createTeam() {
    // Handle team creation logic here
    console.log('Team Created:', this.team);
    this.dialogRef.close(this.team);
  }

  cancel() {
    this.dialogRef.close();
  }
}
