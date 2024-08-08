import { Component } from '@angular/core';
import { ProjectService } from '../../../../services/ProjectService/project-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  project: any = {
    id: '', // Optional for form initialization
    projectName: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0] + 'T00:00',
    endDate: new Date().toISOString().split('T')[0] + 'T23:59',
    productBacklog: [],
    sprints: [],
    teams: [],
    goals: []
  };

  constructor(private projectService: ProjectService, private router: Router) { }

  addProductBacklogItem() {
    this.project.productBacklog.push({ title: '', description: '', priority: '', status: '' });
  }

  removeProductBacklogItem(index: number) {
    this.project.productBacklog.splice(index, 1);
  }

  addSprint() {
    this.project.sprints.push({ number: 1, startDate: '', endDate: '', reviews: '', backlog: [] });
  }

  removeSprint(index: number) {
    this.project.sprints.splice(index, 1);
  }

  addSprintBacklogItem(sprintIndex: number) {
    this.project.sprints[sprintIndex].backlog.push({ title: '', description: '', priority: '', status: '' });
  }

  removeSprintBacklogItem(sprintIndex: number, backlogIndex: number) {
    this.project.sprints[sprintIndex].backlog.splice(backlogIndex, 1);
  }

  addTeam() {
    this.project.teams.push({ name: '', roles: '', members: '' });
  }

  removeTeam(index: number) {
    this.project.teams.splice(index, 1);
  }

  addGoal() {
    this.project.goals.push({ description: '' });
  }

  removeGoal(index: number) {
    this.project.goals.splice(index, 1);
  }

  onSubmit() {
    // Ensure roles and members are handled as arrays
    this.project.teams.forEach(team => {
      if (typeof team.roles === 'string') {
        team.roles = team.roles.split(',').map(role => role.trim()).filter(role => role);
      }
      if (typeof team.members === 'string') {
        team.members = team.members.split(',').map(member => member.trim()).filter(member => member);
      }
    });
  
    // Ensure backlog items are trimmed
    this.project.sprints.forEach(sprint => {
      sprint.backlog = sprint.backlog.map(item => ({
        title: item.title.trim(),
        description: item.description.trim(),
        priority: item.priority.trim(),
        status: item.status.trim()
      }));
    });
  
    this.projectService.createProject(this.project).subscribe({
      next: (response) => {
        console.log('Project created successfully', response);
        this.router.navigate(['/projects']); // Navigate to project list or details page
      },
      error: (err) => {
        console.error('Error creating project', err);
      }
    });
  }
  
}
