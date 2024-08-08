import { Component } from '@angular/core';
import { Project } from '../../../../../models/project'; // Adjust the import path as needed

@Component({
  selector: 'app-nexus-project',
  templateUrl: './nexus-project.component.html',
  styleUrls: ['./nexus-project.component.scss']
})
export class NexusProjectComponent {
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

  constructor() {
    this.loadProjectFromLocalStorage();
  }

  onFormChange(): void {
    this.saveProjectToLocalStorage();
  }

  saveProjectToLocalStorage(): void {
    localStorage.setItem('newProject', JSON.stringify(this.newProject));
  }

  loadProjectFromLocalStorage(): void {
    const storedProject = localStorage.getItem('newProject');
    if (storedProject) {
      this.newProject = JSON.parse(storedProject);
      // Convert date strings back to Date objects
      this.newProject.startDate = new Date(this.newProject.startDate);
      this.newProject.endDate = new Date(this.newProject.endDate);
    }
  }
}
