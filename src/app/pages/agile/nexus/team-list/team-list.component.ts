import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { TeamCreationModalComponent } from '../team-creation-modal/team-creation-modal.component';

interface Team {
  name: string;
  members: string[];
  roles: string[];
}

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];

  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {
    this.loadTeams();
    console.log('Loaded teams from local storage:', this.teams);
  }

  loadTeams(): void {
    const storedTeams = localStorage.getItem('projectTeams');
    this.teams = storedTeams ? JSON.parse(storedTeams) : [];

    // Ensure members and roles are arrays
    this.teams.forEach(team => {
      if (!Array.isArray(team.members)) {
        team.members = [];
      }
      if (!Array.isArray(team.roles)) {
        team.roles = [];
      }
    });
  }

  viewTeamDetails(team: Team) {
    alert(`Viewing details for: ${team.name}`);
  }

  editTeam(team: Team) {
    alert(`Editing team: ${team.name}`);
  }

  openTeamModal() {
    this.dialogService.open(TeamCreationModalComponent)
      .onClose.subscribe(() => {
        this.loadTeams(); // Reload teams after modal is closed
      });
  }
}
