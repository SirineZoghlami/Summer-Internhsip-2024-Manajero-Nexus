import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nexus-timeline',
  templateUrl: './nexus-timeline.component.html',
  styleUrls: ['./nexus-timeline.component.scss']
})
export class NexusTimelineComponent implements OnInit {

  projects = [
    { name: 'Project Alpha', value: 30, stages: [
        { name: 'Planning', description: 'Initial planning and requirement gathering.', progress: 10 },
        { name: 'Design', description: 'Design phase including architecture and UI/UX.', progress: 30 },
        { name: 'Development', description: 'Development phase with coding and implementation.', progress: 50 },
        { name: 'Testing', description: 'Testing phase to ensure quality and functionality.', progress: 70 },
        { name: 'Deployment', description: 'Deployment phase to launch the project.', progress: 90 },
        { name: 'Maintenance', description: 'Ongoing maintenance and support.', progress: 100 }
      ]
    },
    { name: 'Project Beta', value: 60, stages: [
        { name: 'Planning', description: 'Initial planning and requirement gathering.', progress: 20 },
        { name: 'Design', description: 'Design phase including architecture and UI/UX.', progress: 40 },
        { name: 'Development', description: 'Development phase with coding and implementation.', progress: 70 },
        { name: 'Testing', description: 'Testing phase to ensure quality and functionality.', progress: 90 },
        { name: 'Deployment', description: 'Deployment phase to launch the project.', progress: 100 }
      ]
    }
  ];

  selectedProject = this.projects[0];

  ngOnInit() {
    this.animateProgress();
  }

  get status() {
    if (this.selectedProject.value <= 25) {
      return 'danger';
    } else if (this.selectedProject.value <= 50) {
      return 'warning';
    } else if (this.selectedProject.value <= 75) {
      return 'info';
    } else {
      return 'success';
    }
  }

  get canIncrease(): boolean {
    return this.selectedProject.value < 100;
  }

  get canDecrease(): boolean {
    return this.selectedProject.value > 0;
  }

  decreaseValue() {
    if (this.selectedProject.value > 0) {
      this.selectedProject.value -= 25;
      this.animateProgress();
    }
  }

  increaseValue() {
    if (this.selectedProject.value < 100) {
      this.selectedProject.value += 25;
      this.animateProgress();
    }
  }

  selectProject(project) {
    this.selectedProject = project;
    this.animateProgress();
  }

  private animateProgress() {
    const progressBar = document.querySelector('nb-progress-bar');
    if (progressBar) {
      progressBar.classList.add('animate');
      setTimeout(() => progressBar.classList.remove('animate'), 500);
    }
  }
}
