import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { NexusProductBacklogModalComponent } from '../nexus-product-backlog-modal/nexus-product-backlog-modal.component';
import { NexusProject, ProductBacklogItem } from '../../../../../models/nexus-proejct-model';

@Component({
  selector: 'ngx-nexus-product-backlog',
  templateUrl: './nexus-product-backlog.component.html',
  styleUrls: ['./nexus-product-backlog.component.scss']
})
export class NexusProductBacklogComponent implements OnInit {
 

    projectId!: string;
    backlogs: ProductBacklogItem[] = [];
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
          this.loadBacklogs();
          this.loadProjectDetails();
        } else {
          console.warn('No project ID found in route parameters');
        }
      });
    }
  
    loadBacklogs(): void {
      this.projectService.getProjectById(this.projectId).subscribe(
        (project: NexusProject) => {
          this.backlogs = project.productBacklog;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error loading backlogs:', error);
          this.isLoading = false;
        }
      );
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
  
    openBacklogModal() {
      this.dialogService.open(NexusProductBacklogModalComponent)
        .onClose.subscribe((newBacklog: ProductBacklogItem | null) => {
          if (newBacklog) {
            this.addBacklogToProject(newBacklog);
          }
        });
    }
  
    addBacklogToProject(newBacklog: ProductBacklogItem) {
      this.projectService.getProjectById(this.projectId).subscribe(
        (project: NexusProject) => {
          project.productBacklog.push(newBacklog);
          this.projectService.updateProject(this.projectId, project).subscribe(
            () => {
              this.backlogs.push(newBacklog);
            },
            (error) => {
              console.error('Error updating project with new backlog:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching project to add new backlog:', error);
        }
      );
    }
    getPriorityClass(priority: string): string {
      switch (priority.toLowerCase()) {
        case 'high':
          return 'high';
        case 'medium':
          return 'medium';
        case 'low':
          return 'low';
        default:
          return '';
      }
    }
    
    getStatusClass(status: string): string {
      switch (status.toLowerCase()) {
        case 'completed':
          return 'completed';
        case 'in progress':
          return 'in-progress';
        case 'pending':
          return 'pending';
        default:
          return '';
      }
    }
    
  }