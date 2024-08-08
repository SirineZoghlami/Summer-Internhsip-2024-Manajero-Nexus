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
  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;
  projectId: string;
  newProject: Project = {
    id: '',
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
    console.log('Initializing NexusStepperComponent');
    this.loadProject();
    this.loadTeams();
  }

  loadProject(): void {
    const storedProject = localStorage.getItem('newProject');
    if (storedProject) {
      try {
        this.newProject = JSON.parse(storedProject);
        this.newProject.startDate = new Date(this.newProject.startDate);
        this.newProject.endDate = new Date(this.newProject.endDate);
        console.log('Loaded project from local storage:', this.newProject);
      } catch (error) {
        console.error('Error parsing stored project:', error);
      }
    } else {
      console.log('No stored project found in local storage');
    }
  }

  loadTeams(): void {
    const storedTeams = localStorage.getItem('projectTeams');
    if (storedTeams) {
      try {
        this.newProject.teams = JSON.parse(storedTeams);
        console.log('Loaded teams from local storage:', this.newProject.teams);
      } catch (error) {
        console.error('Error parsing stored teams:', error);
      }
    } else {
      console.log('No stored teams found in local storage');
    }
  }

  onFormChange(): void {
    console.log('Form change detected');
    console.log('Current project state:', this.newProject);
    localStorage.setItem('newProject', JSON.stringify({
      ...this.newProject,
      startDate: this.newProject.startDate.toISOString(),
      endDate: this.newProject.endDate.toISOString()
    }));
  }

  next(): void {
    this.onFormChange();
    this.stepper.next();
  }

  prev(): void {
    if (this.stepper.selectedIndex > 0) {
      this.stepper.previous();
    }
  }

  finish(): void {
    this.projectService.createProject(this.newProject).subscribe({
      next: (createdProject: Project) => {
        this.projectId = createdProject.id;
        console.log('Project created successfully with ID:', this.projectId);
        localStorage.removeItem('newProject');
        localStorage.removeItem('projectTeams');
        this.stepper.next();
      },
      error: (error) => {
        console.error('Error creating project:', error);
      }
    });
  }
}
