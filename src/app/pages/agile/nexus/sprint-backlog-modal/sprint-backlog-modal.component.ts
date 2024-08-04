import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { SprintBacklogService } from '../../../../services/SprintBacklogService/SprintBacklogService';

@Component({
  selector: 'app-sprint-backlog-modal',
  templateUrl: './sprint-backlog-modal.component.html',
  styleUrls: ['./sprint-backlog-modal.component.scss']
})
export class SprintBacklogModalComponent implements OnInit {
  @Input() sprintBacklog: any; // For editing existing backlog
  @Input() title: string = '';
  @Input() description: string = '';

  item: any;

  @Output() sprintUpdated: EventEmitter<any> = new EventEmitter();
  

  newSprintBacklog: any = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending'
  };

  isEditMode: boolean = false; // Flag to determine if in edit mode

  constructor(
    protected dialogRef: NbDialogRef<SprintBacklogModalComponent>,
    private sprintBacklogService: SprintBacklogService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    console.log('Sprint Backlog:', this.sprintBacklog); // Add this line to check the input data
    if (this.sprintBacklog) {
      this.isEditMode = true;
      this.newSprintBacklog = { ...this.sprintBacklog };
    }
  }
  

  saveSprintBacklog() {
    if (this.newSprintBacklog.title && this.newSprintBacklog.description) {
      if (this.isEditMode) {
        this.sprintBacklogService.updateSprintBacklog(this.newSprintBacklog.id, this.newSprintBacklog).subscribe(
          response => {
            this.toastrService.success('Sprint Backlog Updated Successfully!', 'Success');
            this.sprintUpdated.emit(response);
            this.dialogRef.close();
          },
          error => {
            this.toastrService.danger('Error updating sprint backlog', 'Error');
            console.error('Error updating sprint backlog', error);
          }
        );
      } else {
        this.sprintBacklogService.createSprintBacklog(this.newSprintBacklog).subscribe(
          response => {
            this.toastrService.success('Sprint Backlog Created Successfully!', 'Success');
            this.sprintUpdated.emit(response);
            this.dialogRef.close();
          },
          error => {
            this.toastrService.danger('Error creating sprint backlog', 'Error');
            console.error('Error creating sprint backlog', error);
          }
        );
      }
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
