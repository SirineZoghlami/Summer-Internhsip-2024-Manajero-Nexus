import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  columns = [
    {
      title: 'To Do',
      tasks: [
        { title: 'Implement feedback collector' },
        { title: 'Bump version for new API for billing' },
        { title: 'Add NPS feedback to wallboard' }
      ]
    },
    {
      title: 'In Progress',
      tasks: [
        { title: 'Update T&C copy with v1.9' },
        { title: 'Tech spike on new stripe integration' },
        { title: 'Refactor stripe verification key validator' },
        { title: 'Change phone number field type to "phone"' }
      ]
    },
    {
      title: 'In Review',
      tasks: [
        { title: 'Multi-dest search UI web' }
      ]
    },
    {
      title: 'Done',
      tasks: [
        { title: 'Quick booking for accommodations' },
        { title: 'Adapt web app no new payments provider' },
        { title: 'Fluid booking on tablets' },
        { title: 'Shopping cart purchasing error - quick fix required' }
      ]
    }
  ];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
