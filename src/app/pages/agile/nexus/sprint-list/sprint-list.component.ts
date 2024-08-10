import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { Sprint, NexusProject } from '../../../../../models/nexus-proejct-model';
import { SprintModalComponent } from '../sprint-modal/sprint-modal.component'; // Adjust the path accordingly

@Component({
  selector: 'app-sprint-list',
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
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id')!;
      if (this.projectId) {
        this.loadProjectDetails();
        this.loadSprints();
      } else {
        console.warn('No projectId provided to SprintListComponent.');
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

  loadSprints(): void {
    console.log('Loading sprints for projectId:', this.projectId);
    this.projectService.getSprintsByProjectId(this.projectId).subscribe(
      (sprints: Sprint[]) => {
        console.log('Sprints loaded successfully:', sprints);
        this.sprints = sprints;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading sprints:', error);
        this.isLoading = false;
      }
    );
  }

  viewSprintDetails(sprint: Sprint) {
    console.log('Viewing details for sprint:', sprint);
    alert(`Viewing details for: Sprint ${sprint.number}`);
  }

  markAsCompleted(sprint: Sprint) {
    console.log('Marking sprint as completed:', sprint);
    this.projectService.markSprintAsCompleted(this.projectId, sprint.number).subscribe(
      () => {
        console.log('Sprint marked as completed successfully');
        this.sprints = this.sprints.map(s => 
          s.number === sprint.number ? { ...s, completed: true } : s
        );
      },
      (error) => {
        console.error('Error marking sprint as completed:', error);
      }
    );
  }

  getStatusClass(status: string): string {
    const statusClass = status.toLowerCase().replace(/ /g, '-');
    console.log('Status class for status:', status, 'is', statusClass);
    return statusClass;
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
    console.log('Adding new sprint to project:', newSprint);
    this.projectService.getProjectById(this.projectId).subscribe(
      (project: NexusProject) => {
        project.sprints.push(newSprint);
        this.projectService.updateProject(this.projectId, project).subscribe(
          () => {
            console.log('Sprint added to project successfully');
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
}
