import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NexusGoalService } from '../../../../services/NexusGoalService/nexus-goal-service.service';
import { NexusGoal } from '../../../../models/nexus-goal';
import { NexusGoalModalComponent } from '../nexus-goal-modal/nexus-goal-modal.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'; // Import the confirmation dialog

@Component({
  selector: 'app-nexus-goal',
  templateUrl: './nexus-goal.component.html',
  styleUrls: ['./nexus-goal.component.scss']
})
export class NexusGoalComponent implements OnInit {
  goals: NexusGoal[] = [];

  constructor(
    private nexusGoalService: NexusGoalService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals(): void {
    this.nexusGoalService.getAllGoals().subscribe(
      data => this.goals = data,
      error => console.error('Error fetching goals', error)
    );
  }

  openCreateModal(): void {
    this.dialogService.open(NexusGoalModalComponent)
      .onClose.subscribe(result => {
        if (result === 'created') {
          this.loadGoals();
          this.toastrService.success('Goal added successfully!', 'Success');
        }
      });
  }

  openEditModal(goal: NexusGoal): void {
    this.dialogService.open(NexusGoalModalComponent, { context: { goal } })
      .onClose.subscribe(result => {
        if (result === 'updated') {
          this.loadGoals();
          this.toastrService.success('Goal updated successfully!', 'Success');
        }
      });
  }

  deleteGoal(id: string): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this goal?'
      }
    }).onClose.subscribe(result => {
      if (result) {
        this.nexusGoalService.deleteGoal(id).subscribe(
          () => {
            this.loadGoals();
            this.toastrService.success('Goal deleted successfully!', 'Success');
          },
          error => {
            console.error('Error deleting goal', error);
            this.toastrService.danger('Failed to delete goal. Please try again.', 'Error');
          }
        );
      }
    });
  }
}
