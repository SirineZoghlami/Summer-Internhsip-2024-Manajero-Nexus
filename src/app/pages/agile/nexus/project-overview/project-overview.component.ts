import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { NexusProject } from '../../../../../models/nexus-proejct-model';
import { NbDialogService,NbToastrService } from '@nebular/theme';
import { ProjectEditModalComponent } from '../project-edit-modal/project-edit-modal.component';
import { ConfirmationDialogComponent } from '../../../agile/nexus/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ngx-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  isLoading = true;
  projectId!: string; 
  project?: NexusProject;
  completedSprintsCount = 0;
  inProgressSprintsCount = 0;
  currentSprintRemainingDays = 0;
  totalTeamMembersCount = 0;
  completedGoalsCount = 0;
  totalBacklogItemsCount = 0;

  constructor(
    private projectService: NexusProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.parent?.snapshot.paramMap.get('id')!;
    if (this.projectId) {
      this.loadProjectDetails();
    }
  }

  loadProjectDetails(): void {
    this.projectService.getProjectById(this.projectId).subscribe(
      (data) => {
        this.project = data;
        this.calculateStats();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching project details', error);
        this.isLoading = false;
      }
    );
  }

  calculateStats(): void {
    if (this.project) {
      this.calculateSprintStats();
      this.calculateTeamStats();
      this.calculateGoalsStats();
      this.calculateBacklogStats();
    }
  }

  calculateSprintStats(): void {
    if (this.project.sprints) {
      this.completedSprintsCount = this.project.sprints.filter(sprint => sprint.completed).length;
      this.inProgressSprintsCount = this.project.sprints.filter(sprint => !sprint.completed && new Date(sprint.endDate) > new Date()).length;

      const currentSprint = this.project.sprints.find(sprint => !sprint.completed && new Date(sprint.endDate) > new Date());
      if (currentSprint) {
        const today = new Date();
        const endDate = new Date(currentSprint.endDate);
        this.currentSprintRemainingDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      }
    }
  }

  calculateTeamStats(): void {
    if (this.project.teams) {
      this.totalTeamMembersCount = this.project.teams.reduce((total, team) => total + team.members.length, 0);
    }
  }

  calculateGoalsStats(): void {
    if (this.project.goals) {
      this.completedGoalsCount = this.project.goals.filter(goal => goal.content).length;
    }
  }

  calculateBacklogStats(): void {
    if (this.project.productBacklog) {
      this.totalBacklogItemsCount = this.project.productBacklog.length;
    }
  }



  navigateToProjects(): void {
    this.router.navigate(['pages/agile/nexus/project']); 
  }

  editProject(): void {
    if (this.project) {
      const dialogRef = this.dialogService.open(ProjectEditModalComponent);

      // Pass project data to modal
      dialogRef.componentRef.instance.setProjectData(this.project);

      dialogRef.onClose.subscribe((updated: boolean) => {
        if (updated) {
          this.loadProjectDetails(); // Reload project details if updated
          this.toastrService.success('Project updated successfully!', 'Success', {
            status: 'success',
            destroyByClick: true
          }); // Show success toast
        } else {
          this.toastrService.danger('Failed to update project.', 'Error', {
            status: 'danger',
            destroyByClick: true
          }); // Show error toast
        }
      });
    }
  }
  confirmDelete(): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this project?'
      }
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) this.deleteProject();
    });
  }

  deleteProject(): void {
    if (this.projectId) {
      this.projectService.deleteProject(this.projectId).subscribe(
        () => {
          this.toastrService.success('Project deleted successfully');
          this.router.navigate(['/pages/agile/nexus/project']); // Navigate back to the project list or another page
        },
        error => {
          console.error('Error deleting project:', error);
          this.toastrService.danger('Failed to delete project');
        }
      );
    }
  }
}
