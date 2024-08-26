import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { Sprint, NexusProject } from '../../../../../models/nexus-proejct-model';
import { ReviewModalComponent } from '../review-modal/review-modal.component'; 
import { SprintModalComponent } from '../sprint-modal/sprint-modal.component';
import { ConfirmationDialogComponent } from '../../../agile/nexus/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ngx-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnInit {
  projectId!: string;
  sprints: Sprint[] = [];
  isLoading = true;
  isModalVisible = false;
    projectName?: string;

  constructor(
    private route: ActivatedRoute,
    private projectService: NexusProjectService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.projectId = params.get('id')!;
      if (this.projectId) {
        this.loadSprints();
        this.loadProjectDetails(); // Load project details if needed
      } else {
        console.warn('No project ID found in route parameters');
      }
    });
  }

  loadProjectDetails(): void {
    this.projectService.getProjectById(this.projectId).subscribe(
      (project: NexusProject) => {
        this.projectName = project.projectName;
      },
      (error) => {
        console.error('Error loading project details:', error);
        this.isLoading = false;
      }
    );
  }

  loadSprints(): void {
    this.projectService.getSprintsByProjectId(this.projectId).subscribe(
      (sprints: Sprint[]) => {
        this.sprints = sprints;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading sprints:', error);
        this.isLoading = false;
      }
    );
  }

  confirmDelete(sprintNumber: number): void {
    console.log('Opening confirmation dialog for sprint number:', sprintNumber); // Debug statement
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this sprint?'
      }
    }).onClose.subscribe((confirmed: boolean) => {
      console.log('Confirmation dialog result:', confirmed); // Debug statement
      if (confirmed) {
        this.deleteSprint(sprintNumber);
      }
    });
  }

  deleteSprint(sprintNumber: number): void {
    console.log('Deleting sprint number:', sprintNumber); // Debug statement
    this.projectService.deleteSprint(this.projectId, sprintNumber).subscribe(
      () => {
        this.sprints = this.sprints.filter(sprint => sprint.number !== sprintNumber);
        this.toastrService.success('Sprint deleted successfully');
      },
      error => {
        console.error('Error deleting sprint:', error);
        this.toastrService.danger('Failed to delete sprint');
      }
    );
  }

  openReviewModal(sprint: Sprint) {
    this.dialogService.open(ReviewModalComponent)
      .onClose.subscribe((review: { reviewDate: string; reviewContent: string } | null) => {
        if (review) {
          this.addReviewToSprint(sprint, review);
        }
      });
  }

  addReviewToSprint(sprint: Sprint, review: { reviewDate: string; reviewContent: string }) {
    const updatedSprint = { ...sprint, reviews: [...(sprint.reviews || []), review] };

    this.projectService.getProjectById(this.projectId).subscribe(
      (project: NexusProject) => {
        const updatedSprints = project.sprints.map(s => 
          s.number === sprint.number ? updatedSprint : s
        );
        project.sprints = updatedSprints;

        this.projectService.updateProject(this.projectId, project).subscribe(
          () => {
            this.sprints = updatedSprints;
          },
          (error) => {
            console.error('Error updating project with new review:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching project to add review:', error);
      }
    );
  }

  openSprintModal() {
    this.dialogService.open(SprintModalComponent)
      .onClose.subscribe((newSprint: Sprint | null) => {
        if (newSprint) {
          this.addSprintToProject(newSprint);
        }
      });
  }

  addSprintToProject(newSprint: Sprint) {
    this.projectService.getProjectById(this.projectId).subscribe(
      (project: NexusProject) => {
        project.sprints.push(newSprint);
        this.projectService.updateProject(this.projectId, project).subscribe(
          () => {
            this.sprints.push(newSprint);
          },
          (error) => {
            console.error('Error updating project with new sprint:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching project to add new sprint:', error);
      }
    );
  }
  
  
  
  markAsCompleted(sprint: Sprint) {
    this.projectService.markSprintAsCompleted(this.projectId, sprint.number).subscribe(
      () => {
        // Update sprint status locally
        this.sprints = this.sprints.map(s => 
          s.number === sprint.number ? { ...s, completed: true } : s
        );
  
        // Check if all sprints are completed and update the project status
        const allSprintsCompleted = this.sprints.every(s => s.completed);
        if (allSprintsCompleted) {
          this.projectService.updateProjectStatusIfCompleted(this.projectId).subscribe(
            () => {
              console.log('Project status updated to completed.');
            },
            (error) => {
              console.error('Error updating project status:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error marking sprint as completed:', error);
      }
    );
  }
  
  
  getStatusClass(completed: boolean): string {
    return completed ? 'completed' : 'pending';
  }
  

}
