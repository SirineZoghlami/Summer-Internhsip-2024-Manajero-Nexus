// sprint-backlog-modal.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { SprintBacklogService } from '../../../../../services/SprintBacklogService';

@Component({
  selector: 'app-sprint-backlog-modal',
  templateUrl: './sprint-backlog-modal.component.html',
  styleUrls: ['./sprint-backlog-modal.component.scss']
})
export class SprintBacklogModalComponent {
  @Input() title: string;
  @Input() description: string;
  @Output() sprintCreated: EventEmitter<any> = new EventEmitter();

  newSprintBacklog: any = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending'
  };

  constructor(
    protected dialogRef: NbDialogRef<SprintBacklogModalComponent>,
    private sprintBacklogService: SprintBacklogService,
    private toastrService: NbToastrService
  ) {}

  createSprintBacklog() {
    if (this.newSprintBacklog.title && this.newSprintBacklog.description) {
      this.sprintBacklogService.createSprintBacklog(this.newSprintBacklog).subscribe(
        response => {
          this.toastrService.success('Sprint Backlog Created Successfully!', 'Success');
          this.sprintCreated.emit(response); // Emit the response data
          this.resetForm();
          this.dialogRef.close(); // Close the modal
        },
        error => {
          this.toastrService.danger('Error creating sprint backlog', 'Error');
          console.error('Error creating sprint backlog', error);
        }
      );
    } else {
      this.toastrService.warning('Title and description are required.', 'Warning');
    }
  }

  resetForm() {
    this.newSprintBacklog = {
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
      status: 'Pending'
    };
  }

  cancel() {
    this.dialogRef.close();
  }
}
