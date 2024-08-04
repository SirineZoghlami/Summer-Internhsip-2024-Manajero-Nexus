import { Component, OnInit, Inject } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NexusIntegrationTeam } from '../../../../models/nexus-integration-team.model';
import { NexusIntegrationTeamService } from '../../../../services/NexusInegrationTeamService/nexus-integration-team.service.service';

@Component({
  selector: 'app-team-creation-modal',
  templateUrl: './team-creation-modal.component.html',
  styleUrls: ['./team-creation-modal.component.scss']
})
export class TeamCreationModalComponent implements OnInit {
  teamForm: FormGroup;
  team?: NexusIntegrationTeam; // Ensure this matches your model

  constructor(
    protected dialogRef: NbDialogRef<TeamCreationModalComponent>,
    private fb: FormBuilder,
    private teamService: NexusIntegrationTeamService // Service for API calls
  ) {}

  ngOnInit() {
    // Initialize the form with validation
    this.teamForm = this.fb.group({
      teamName: [this.team?.teamName || '', Validators.required],
      members: [this.team?.members || '', Validators.required],
      roles: [this.team?.roles || '', Validators.required]
    });
  }

  get formControls() {
    return this.teamForm.controls;
  }

  createTeam() {
    if (this.teamForm.valid) {
      const teamData: NexusIntegrationTeam = this.teamForm.value;
      this.teamService.createTeam(teamData).subscribe(
        (newTeam) => {
          this.dialogRef.close({ team: newTeam, isUpdated: false });
        },
        (error) => {
          console.error(error);
          this.dialogRef.close({ team: null, isUpdated: false });
        }
      );
    }
  }

  updateTeam() {
    if (this.team && this.team.id && this.teamForm.valid) {
      const teamData: NexusIntegrationTeam = this.teamForm.value;
      this.teamService.updateTeam(this.team.id, teamData).subscribe(
        (updatedTeam) => {
          this.dialogRef.close({ team: updatedTeam, isUpdated: true });
        },
        (error) => {
          console.error(error);
          this.dialogRef.close({ team: null, isUpdated: true });
        }
      );
    }
  }

  createOrUpdateTeam() {
    if (this.team) {
      this.updateTeam();
    } else {
      this.createTeam();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
