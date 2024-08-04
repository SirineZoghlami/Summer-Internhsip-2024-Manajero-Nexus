import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../../models/project';
import { ProjectService } from '../../../../../services/ProjectService/project-service.service';
import { NbToastrService } from '@nebular/theme';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nexus-project',
  templateUrl: './nexus-project.component.html',
  styleUrls: ['./nexus-project.component.scss']
})
export class NexusProjectComponent implements OnInit {
  newProject: Project = {
    projectName: '',
    description: '',
    startDate: new Date(), 
    endDate: new Date(),
    nexusIntegrationTeam: [],
    nexusGoalId: '',
    productBacklog: [],
    sprints: []
  };

  constructor(
    private projectService: ProjectService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    // Ensure initialization
    this.resetForm();
  }

  saveProject(form: NgForm) {
    if (form.valid) {
      this.projectService.createProject(this.newProject).subscribe({
        next: (response) => {
          this.toastrService.success('Project created successfully!', 'Success');
          this.resetForm();  // Reset the form after successful submission
        },
        error: (error) => {
          this.toastrService.danger('Error creating project', 'Error');
        }
      });
    }
  }

  resetForm() {
    this.newProject = {
      projectName: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      nexusIntegrationTeam: [],
      nexusGoalId: '',
      productBacklog: [],
      sprints: []
    };
  }
}
