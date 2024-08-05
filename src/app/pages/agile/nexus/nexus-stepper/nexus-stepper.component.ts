import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { NbStepperComponent, NbToastrService } from '@nebular/theme';
import { ProjectService } from '../../../../services/ProjectService/project-service.service';
import { Project } from '../../../../models/project';

@Component({
  selector: 'app-nexus-stepper',
  templateUrl: './nexus-stepper.component.html',
  styleUrls: ['./nexus-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NexusStepperComponent implements OnInit {
  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;
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
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    // Load project data from local storage if available
    this.loadProjectFromLocalStorage();
  }

  // Load project data from local storage
  private loadProjectFromLocalStorage() {
    const storedProject = localStorage.getItem('newProject');
    if (storedProject) {
      try {
        const parsedProject = JSON.parse(storedProject);
        this.newProject = {
          projectName: parsedProject.projectName || '',
          description: parsedProject.description || '',
          startDate: new Date(parsedProject.startDate) || new Date(),
          endDate: new Date(parsedProject.endDate) || new Date(),
          nexusIntegrationTeam: parsedProject.nexusIntegrationTeam || [],
          nexusGoalId: parsedProject.nexusGoalId || '',
          productBacklog: parsedProject.productBacklog || [],
          sprints: parsedProject.sprints || []
        };
      } catch (error) {
        console.error('Error parsing project data from local storage:', error);
      }
    }
  }

  // Save project data to local storage
  private saveProjectToLocalStorage() {
    const projectToSave = {
      ...this.newProject,
      startDate: this.newProject.startDate.toISOString(),
      endDate: this.newProject.endDate.toISOString()
    };
    console.log('Saving to local storage:', projectToSave); // Log to check the saved values
    try {
      localStorage.setItem('newProject', JSON.stringify(projectToSave));
    } catch (error) {
      console.error('Error saving project data to local storage:', error);
    }
  }
  // Move to the next step
  next() {
    this.saveProjectToLocalStorage();
    this.stepper.next();
  }

  // Move to the previous step
  prev() {
    if (this.stepper.selectedIndex > 0) {
      this.stepper.previous();
    }
  }

  // Finish the process
 // Finish the process
 finish() {
  const storedProject = localStorage.getItem('newProject');
  if (storedProject) {
    try {
      this.newProject = JSON.parse(storedProject);

      console.log('Final project object before sending to backend:', this.newProject); // Log to check values

      // Save the project to the backend
      this.projectService.createProject(this.newProject).subscribe({
        next: (createdProject: Project) => {
          this.toastrService.success('Project created successfully!', 'Success');
          // Clear local storage after project creation
          localStorage.removeItem('newProject');
          // Optionally, navigate to another page or reset the stepper
          this.stepper.reset(); // Reset the stepper
        },
        error: (error) => {
          this.toastrService.danger('Error creating project. Please try again.', 'Error');
          console.error('Error creating project:', error);
        }
      });
    } catch (error) {
      console.error('Error parsing project data from local storage:', error);
    }
  }
}
}