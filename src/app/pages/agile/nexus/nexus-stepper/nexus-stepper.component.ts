import { Component, OnInit, ViewChild } from '@angular/core';
import { NbStepperComponent } from '@nebular/theme';
import { Project } from '../../../../models/project';
import { ProjectService } from '../../../../services/ProjectService/project-service.service';

@Component({
  selector: 'app-nexus-stepper',
  templateUrl: './nexus-stepper.component.html',
  styleUrls: ['./nexus-stepper.component.scss']
})
export class NexusStepperComponent implements OnInit {
  @ViewChild(NbStepperComponent, { static: false }) stepper: NbStepperComponent;
  newProject: Project = {
    id: '', // Initialize as empty; backend should set this
    projectName: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    productBacklog: [],
    sprints: [],
    teams: [],
    goals: []
  };

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProject();
    this.loadTeams();
  }

  loadProject(): void {
    const storedProject = localStorage.getItem('newProject');
    if (storedProject) {
      try {
        const projectData = JSON.parse(storedProject);
        this.newProject = {
          ...projectData,
          startDate: new Date(projectData.startDate),
          endDate: new Date(projectData.endDate)
        };
      } catch (error) {
        console.error('Error parsing stored project:', error);
      }
    }
  }

  loadTeams(): void {
    const storedTeams = localStorage.getItem('projectTeams');
    if (storedTeams) {
      try {
        this.newProject.teams = JSON.parse(storedTeams);
      } catch (error) {
        console.error('Error parsing stored teams:', error);
      }
    }
  }

  onFormChange(): void {
    this.newProject.startDate = new Date(this.newProject.startDate);
    this.newProject.endDate = new Date(this.newProject.endDate);

    localStorage.setItem('newProject', JSON.stringify({
      ...this.newProject,
      startDate: this.formatDate(this.newProject.startDate),
      endDate: this.formatDate(this.newProject.endDate)
    }));
  }

  next(): void {
    this.onFormChange();
    if (this.stepper) {
      this.stepper.next();
    }
  }

  prev(): void {
    if (this.stepper && this.stepper.selectedIndex > 0) {
      this.stepper.previous();
    }
  }

  finish(): void {
    // Log the project data before sending it to the server
    console.log('Finishing project creation with data:', this.newProject);
  
    this.projectService.createProject(this.newProject).subscribe({
      next: (createdProject: Project) => {
        // Log the response from the server
        console.log('Project successfully created:', createdProject);
  
        this.newProject = createdProject;
        localStorage.removeItem('newProject');
        localStorage.removeItem('projectTeams');
  
        if (this.stepper) {
          this.stepper.next();
        }
      },
      error: (error) => {
        // Log any errors that occur during the project creation
        console.error('Error creating project:', error);
      }
    });
  }
  
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
