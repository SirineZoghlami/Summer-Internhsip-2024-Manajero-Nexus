import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { NexusProjectService } from '../../../../core/services/nexus-services/nexus.project.service.service';
import { NexusProject, NexusGoal } from '../../../../core/models/nexus-models/nexus-proejct-model';
import { GoalModalComponent } from '../goal-modal/goal-modal.component'; // Adjust the path accordingly

@Component({
  selector: 'ngx-nexus-goal-list',
  templateUrl: './nexus-goal-list.component.html',
  styleUrls: ['./nexus-goal-list.component.scss']
})
export class NexusGoalListComponent implements OnInit {
  projectId!: string;
  goals: NexusGoal[] = [];
  isLoading = true;
  projectName?: string;

  constructor(
    private route: ActivatedRoute,
    private projectService: NexusProjectService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.projectId = params.get('id')!;
      if (this.projectId) {
        this.loadGoals();
      } else {
        console.warn('No project ID found in route parameters');
      }
    });
  }


  loadProjectDetails(): void {
    this.projectService.getProjectById(this.projectId).subscribe(
      (project: NexusProject) => {
        console.log('Project loaded successfully:', project);
        this.projectName = project.projectName;
      },
      (error) => {
        console.error('Error loading project details:', error);
      }
    );
  }

  loadGoals(): void {
    console.log('Loading goals for projectId:', this.projectId);
    this.projectService.getGoalsByProjectId(this.projectId).subscribe(
      (goals: NexusGoal[]) => {
        console.log('Goals loaded successfully:', goals);
        this.goals = goals;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading goals:', error);
        this.isLoading = false;
      }
    );
  }

  openGoalModal() {
    this.dialogService.open(GoalModalComponent)
      .onClose.subscribe((newGoal: NexusGoal | null) => {
        if (newGoal) {
          this.addGoalToProject(newGoal);
        }
      });
  }

  addGoalToProject(newGoal: NexusGoal) {
    console.log('Adding new goal to project:', newGoal);
    this.projectService.getProjectById(this.projectId).subscribe(
      (project: NexusProject) => {
        project.goals.push(newGoal);
        this.projectService.updateProject(this.projectId, project).subscribe(
          () => {
            console.log('Goal added to project successfully');
            this.goals.push(newGoal);
          },
          (error) => {
            console.error('Error updating project with new goal:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching project to add new goal:', error);
      }
    );
  }
  deleteGoal(goalId: string) {
    if (confirm('Are you sure you want to delete this goal?')) {
      this.projectService.deleteGoal(this.projectId, goalId).subscribe(
        () => {
          console.log('Goal deleted successfully');
          this.goals = this.goals.filter(goal => goal.id !== goalId);
        },
        (error) => {
          console.error('Error deleting goal:', error);
        }
      );
    }
  }
}
