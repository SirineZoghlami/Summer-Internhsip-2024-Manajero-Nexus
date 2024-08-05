import { Component, Output, EventEmitter,OnInit} from '@angular/core';
import { Project } from '../../../../../models/project';
import { ProjectService } from '../../../../../services/ProjectService/project-service.service';
import { NbToastrService } from '@nebular/theme';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nexus-project',
  templateUrl: './nexus-project.component.html',
  styleUrls: ['./nexus-project.component.scss']
})export class NexusProjectComponent {
  newProject: Project;
  @Output() projectCreated = new EventEmitter<string>();

  constructor() {
    const storedProject = localStorage.getItem('newProject');
    this.newProject = storedProject ? JSON.parse(storedProject) : {
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

  // Save project data to local storage on form changes
  onFormChange() {
    console.log('Form change detected. Saving to local storage:', this.newProject);
    localStorage.setItem('newProject', JSON.stringify(this.newProject));
  }
}
