import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { NexusProject, NexusGoal } from '../../../../../models/nexus-proejct-model';
import { GoalModalComponent } from '../goal-modal/goal-modal.component'; // Adjust the path accordingly

@Component({
  selector: 'app-nexus-goal-list',
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
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id')!;
      if (this.projectId) {
        this.loadProjectDetails();
        this.loadGoals();
      } else {
        console.warn('No projectId provided to NexusGoalListComponent.');
        this.isLoading = false;
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
}
