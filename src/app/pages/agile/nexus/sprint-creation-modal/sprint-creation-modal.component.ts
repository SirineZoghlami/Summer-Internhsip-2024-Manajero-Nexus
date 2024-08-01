import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-sprint-creation-modal',
  templateUrl: './sprint-creation-modal.component.html',
  styleUrls: ['./sprint-creation-modal.component.scss']
})
export class SprintCreationModalComponent {
  @Input() showModal: boolean = false;
  @Output() sprintCreated = new EventEmitter<any>();
  newSprint: any = {};

  createSprint() {
    if (this.newSprint.name && this.newSprint.startDate && this.newSprint.endDate && this.newSprint.status) {
      this.sprintCreated.emit(this.newSprint);
      this.closeModal();
    } else {
      alert('Please fill out all fields.');
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
