import { Component } from '@angular/core';
import { Project } from '../../../../../models/project'; // Adjust the import path as needed

@Component({
  selector: 'app-nexus-project',
  templateUrl: './nexus-project.component.html',
  styleUrls: ['./nexus-project.component.scss']
})
export class NexusProjectComponent {
  newProject: Partial<Project> = {
    projectName: '',
    description: '',
    startDate: new Date(),
    endDate: new Date()
  };

  // Method to handle form changes
  onFormChange(): void {
    // Ensure dates are `Date` objects
    this.newProject.startDate = new Date(this.newProject.startDate);
    this.newProject.endDate = new Date(this.newProject.endDate);
  
    localStorage.setItem('newProject', JSON.stringify({
      ...this.newProject,
      startDate: this.formatDate(this.newProject.startDate),
      endDate: this.formatDate(this.newProject.endDate)
    }));
  }
  
  // Method to save project data to local storage
  saveProject(): void {
    // Ensure the necessary fields are present
    const projectData = {
      projectName: this.newProject.projectName,
      description: this.newProject.description,
      startDate: this.newProject.startDate,
      endDate: this.newProject.endDate
    };

    // Convert dates to string for local storage
    const projectDataWithDates = {
      ...projectData,
      startDate: (projectData.startDate as Date).toISOString(),
      endDate: (projectData.endDate as Date).toISOString()
    };

    // Save the project data to local storage
    localStorage.setItem('newProject', JSON.stringify(projectDataWithDates));

    // Log the saved data
    console.log('Project saved to local storage:', projectDataWithDates);
  }

  // Define the formatDate method
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
