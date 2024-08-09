import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { NexusProject } from '../../../../../models/nexus-proejct-model'; // Adjust the path accordingly

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: NexusProject[] = [];
  isLoading = true;
  selectedProject?: NexusProject;

  constructor(private projectService: NexusProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (projects: NexusProject[]) => {
        this.projects = projects;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading projects', error);
        this.isLoading = false;
      }
    );
  }

  viewProjectDetails(project: NexusProject): void {
    this.selectedProject = project;
  }

  openSettings(project: NexusProject): void {
    if (project && project.id) {
      this.router.navigate([`/pages//agile/project-settings/${project.id}`]);
    }
  }

  closeDetails(): void {
    this.selectedProject = undefined;
  }
  createNewProject(): void {
    // Navigate to the create project page or open a modal
    this.router.navigate(['/pages/agile/nexus/project/create']); // Adjust the path as necessary
  }
}
