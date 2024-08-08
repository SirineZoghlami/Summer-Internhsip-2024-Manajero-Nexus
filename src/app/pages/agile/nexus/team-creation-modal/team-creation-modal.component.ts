import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Team } from '../../../../models/project'; // Import the Team interface

@Component({
  selector: 'app-team-creation-modal',
  templateUrl: './team-creation-modal.component.html',
  styleUrls: ['./team-creation-modal.component.scss']
})
export class TeamCreationModalComponent {
  teamName: string = '';
  teamMembers: string = '';
  teamRoles: string = '';

  constructor(protected dialogRef: NbDialogRef<TeamCreationModalComponent>) {}

  createTeam() {
    const storedTeams = localStorage.getItem('projectTeams');
    let teams: Team[] = storedTeams ? JSON.parse(storedTeams) : [];

    // Split members and roles by comma
    const newTeam: Team = {
      name: this.teamName,
      members: this.teamMembers.length > 0 ? this.teamMembers.split(',').map(member => member.trim()) : [],
      roles: this.teamRoles.length > 0 ? this.teamRoles.split(',').map(role => role.trim()) : []
    };

    // Add the new team to the array and store it
    teams.push(newTeam);
    localStorage.setItem('projectTeams', JSON.stringify(teams));
    this.dialogRef.close(newTeam);
  }

  cancel() {
    this.dialogRef.close();
  }
}
