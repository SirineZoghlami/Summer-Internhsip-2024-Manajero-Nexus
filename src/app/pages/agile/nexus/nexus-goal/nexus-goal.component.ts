import { Component, OnInit } from '@angular/core';
import { NexusGoalService } from '../../../../services/NexusGoalService/nexus-goal-service.service';
import { NexusGoal } from '../../../../models/nexus-goal';

@Component({
  selector: 'app-nexus-goal',
  templateUrl: './nexus-goal.component.html',
  styleUrls: ['./nexus-goal.component.scss']
})
export class NexusGoalComponent implements OnInit {
  goals: NexusGoal[] = [];
  selectedGoal: NexusGoal | null = null;
  confirmationMessage: string | null = null; // Add this property

  constructor(private nexusGoalService: NexusGoalService) { }

  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals(): void {
    this.nexusGoalService.getAllGoals().subscribe(
      data => this.goals = data,
      error => console.error('Error fetching goals', error)
    );
  }

  selectGoal(goal: NexusGoal): void {
    this.selectedGoal = goal;
  }

  createGoal(goal: NexusGoal): void {
    this.nexusGoalService.createGoal(goal).subscribe(
      () => {
        this.loadGoals();
        this.confirmationMessage = 'Goal added successfully!'; // Set the confirmation message
        setTimeout(() => this.confirmationMessage = null, 3000); // Clear message after 3 seconds
      },
      error => {
        console.error('Error creating goal', error);
        this.confirmationMessage = 'Failed to add goal. Please try again.';
        setTimeout(() => this.confirmationMessage = null, 3000); // Clear message after 3 seconds
      }
    );
  }

  updateGoal(id: string, goal: NexusGoal): void {
    this.nexusGoalService.updateGoal(id, goal).subscribe(
      () => this.loadGoals(),
      error => console.error('Error updating goal', error)
    );
  }

  deleteGoal(id: string): void {
    this.nexusGoalService.deleteGoal(id).subscribe(
      () => this.loadGoals(),
      error => console.error('Error deleting goal', error)
    );
  }
}
