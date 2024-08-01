import { Component } from '@angular/core';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent {
  sprints = [
    { id: 1, name: 'Sprint 1', startDate: '2024-07-01', endDate: '2024-07-14', status: 'Completed' },
    { id: 2, name: 'Sprint 2', startDate: '2024-07-15', endDate: '2024-07-28', status: 'In Progress' },
    { id: 3, name: 'Sprint 3', startDate: '2024-07-29', endDate: '2024-08-11', status: 'Pending' },
    { id: 4, name: 'Sprint 4', startDate: '2024-08-12', endDate: '2024-08-25', status: 'Pending' }
  ];

  isModalVisible = false;

  viewSprintDetails(sprint: any) {
    alert(`Viewing details for: ${sprint.name}`);
  }

  markAsCompleted(sprint: any) {
    sprint.status = 'Completed';
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(/ /g, '-');
  }

  openSprintModal() {
    this.isModalVisible = true;
  }

  handleSprintCreation(newSprint: any) {
    this.sprints.push(newSprint);
    this.isModalVisible = false;
  }
}
