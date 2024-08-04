import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TeamCreationModalComponent } from '../team-creation-modal/team-creation-modal.component';
import { NexusIntegrationTeamService } from '../../../../services/NexusInegrationTeamService/nexus-integration-team.service.service';
import { NexusIntegrationTeam } from '../../../../models/nexus-integration-team.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams: NexusIntegrationTeam[] = [];

  constructor(
    private dialogService: NbDialogService,
    private teamService: NexusIntegrationTeamService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getAllTeams().subscribe(
      (data: NexusIntegrationTeam[]) => {
        this.teams = data;
      },
      error => {
        console.error('Error fetching teams', error);
      }
    );
  }

  editTeam(team: NexusIntegrationTeam) {
    this.dialogService.open(TeamCreationModalComponent, {
      context: { team: team }
    }).onClose.subscribe(result => {
      if (result && result.team) {
        this.loadTeams(); // Refresh the list after update
        this.toastrService.success('Team updated successfully!', 'Success');
      } else if (result && !result.team && result.isUpdated) {
        this.toastrService.danger('Failed to update team.', 'Error');
      }
    });
  }

  openTeamModal() {
    this.dialogService.open(TeamCreationModalComponent)
      .onClose.subscribe(result => {
        if (result && result.team) {
          this.teams.push(result.team);
          this.toastrService.success('Team added successfully!', 'Success');
        } else if (result && !result.team) {
          this.toastrService.danger('Failed to add team.', 'Error');
        }
      });
  }

  deleteTeam(team: NexusIntegrationTeam) {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete the team "${team.teamName}"?`
      }
    }).onClose.subscribe(confirmed => {
      if (confirmed) {
        this.teamService.deleteTeam(team.id!).subscribe(
          () => {
            this.loadTeams(); // Refresh the list after deletion
            this.toastrService.success('Team deleted successfully!', 'Success');
          },
          error => {
            console.error('Error deleting team', error);
            this.toastrService.danger('Failed to delete team.', 'Error');
          }
        );
      }
    });
  }
}
