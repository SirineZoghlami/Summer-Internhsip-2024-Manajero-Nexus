import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { TeamCreationModalComponent } from '../team-creation-modal/team-creation-modal.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent {

  teams = [
    { id: 1, name: 'Development Team', members: ['Alice', 'Bob', 'Charlie'], roles: ['Developer', 'Tester', 'Lead'] },
    { id: 2, name: 'Design Team', members: ['David', 'Eve'], roles: ['UI/UX Designer', 'Graphic Designer'] },
    { id: 3, name: 'Marketing Team', members: ['Frank', 'Grace'], roles: ['Marketing Manager', 'Content Creator'] },
    { id: 4, name: 'Sales Team', members: ['Hannah', 'Ian'], roles: ['Sales Manager', 'Sales Representative'] }
  ];

  constructor(private dialogService: NbDialogService) {}

  viewTeamDetails(team: any) {
    alert(`Viewing details for: ${team.name}`);
  }

  editTeam(team: any) {
    alert(`Editing team: ${team.name}`);
  }

  openTeamModal() {
    this.dialogService.open(TeamCreationModalComponent)
      .onClose.subscribe((newTeam) => {
        if (newTeam) {
          this.teams.push(newTeam);
        }
      });
  }
}
