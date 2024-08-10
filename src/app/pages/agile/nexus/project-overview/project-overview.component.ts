import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { NexusProject } from '../../../../../models/nexus-proejct-model';

@Component({
  selector: 'ngx-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  isLoading = true;
  projectId!: string; 
  project?: NexusProject;

  constructor(
    private projectService: NexusProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Use snapshot to get the projectId directly from the parent route
    this.projectId = this.route.parent?.snapshot.paramMap.get('id')!;
    console.log(`Project ID retrieved: ${this.projectId}`);
    
    if (this.projectId) {
      this.loadProjectDetails();
    } else {
      console.warn('No project ID found in route parameters');
    }
  }

  loadProjectDetails(): void {
    console.log(`Loading project details for ID: ${this.projectId}`);

    if (this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe(
        (data) => {
          console.log('Project data received:', data);
          this.project = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching project details', error);
          this.isLoading = false;
        }
      );
    } else {
      console.warn('No project ID found in route parameters');
      this.isLoading = false;
    }
  }

  editProject(): void {
    // Implement edit project logic
    console.log('Edit project method called');
  }
}
