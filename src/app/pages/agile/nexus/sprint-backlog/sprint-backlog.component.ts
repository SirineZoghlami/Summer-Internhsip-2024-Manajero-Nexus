import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { SprintBacklogModalComponent } from '../sprint-backlog-modal/sprint-backlog-modal.component';

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.scss']
})
export class SprintBacklogComponent {
  backlogItems = [
    { id: 1, title: 'Feature A', description: 'Description for Feature A', priority: 'High', status: 'Pending' },
    { id: 2, title: 'Feature B', description: 'Description for Feature B', priority: 'Medium', status: 'In Progress' },
    { id: 3, title: 'Feature C', description: 'Description for Feature C', priority: 'Low', status: 'Completed' },
    { id: 4, title: 'Feature D', description: 'Description for Feature D', priority: 'High', status: 'Pending' }
  ];

  constructor(private dialogService: NbDialogService) {}

  viewDetails(item: any) {
    alert(`Viewing details for: ${item.title}`);
  }

  markAsCompleted(item: any) {
    item.status = 'Completed';
  }

  getPriorityClass(priority: string): string {
    return priority.toLowerCase();
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(/ /g, '-');
  }

  openSprintModal() {
    this.dialogService.open(SprintBacklogModalComponent, {
      context: {
        title: 'Add New Sprint'
      }
    });
  }
}
