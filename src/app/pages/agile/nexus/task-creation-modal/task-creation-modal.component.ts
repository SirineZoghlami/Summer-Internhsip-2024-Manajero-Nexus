import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-task-creation-modal',
  templateUrl: './task-creation-modal.component.html',
  styleUrls: ['./task-creation-modal.component.scss']
})
export class TaskCreationModalComponent {
  @Input() showModal: boolean = false;
  @Output() taskCreated = new EventEmitter<any>();
  newTask: any = {};

  createTask() {
    if (this.newTask.title && this.newTask.description && this.newTask.dueDate && this.newTask.priority) {
      this.taskCreated.emit(this.newTask);
      this.closeModal();
    } else {
      alert('Please fill out all fields.');
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
