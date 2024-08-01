import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sprint-backlog-modal',
  templateUrl: './sprint-backlog-modal.component.html',
  styleUrls: ['./sprint-backlog-modal.component.scss']
})
export class SprintBacklogModalComponent {
  @Input() title: string;

  newSprint = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium'
  };

  createSprint() {
    // Logic to handle sprint creation
    alert(`Sprint Created: ${this.newSprint.title}`);
    // Reset form after submission
    this.resetForm();
    // Dialog will close automatically after creation if handled from the service
  }

  resetForm() {
    this.newSprint = {
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium'
    };
  }

  cancel() {
    // No need for this method if you are using Nebular's dialog service
  }
}
