import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { Sprint, NexusProject } from '../../../../../models/nexus-proejct-model';
import { SprintModalComponent } from '../sprint-modal/sprint-modal.component';

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
    this.route.parent?.paramMap.subscribe(params => {
      this.projectId = params.get('id')!;
      if (this.projectId) {
        this.loadSprints();
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

  viewSprintDetails(sprint: Sprint) {
    alert(`Viewing details for: Sprint ${sprint.number}`);
  }

  markAsCompleted(sprint: Sprint) {
    this.projectService.markSprintAsCompleted(this.projectId, sprint.number).subscribe(
      () => {
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
    return status.toLowerCase().replace(/ /g, '-');
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
}
