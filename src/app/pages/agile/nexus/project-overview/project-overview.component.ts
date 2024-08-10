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
  project?: NexusProject;

  constructor(
    private projectService: NexusProjectService, // Use the correct service
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProjectDetails();
  }

  loadProjectDetails(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe(
        (data) => {
          this.project = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching project details', error);
          this.isLoading = false;
        }
      );
    }
  }

  editProject(): void {
    // Implement edit project logic
  }
}