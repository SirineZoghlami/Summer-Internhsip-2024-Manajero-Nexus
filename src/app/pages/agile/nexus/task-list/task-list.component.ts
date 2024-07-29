import { Component, OnInit } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  columns = [
    { name: 'To Do', tasks: this.getToDoTasks() },
    { name: 'In Progress', tasks: this.getInProgressTasks() },
    { name: 'Review', tasks: this.getReviewTasks() },
    { name: 'Done', tasks: this.getDoneTasks() }
  ];
  
  isModalVisible = false;
  selectedTask: any = null;
  showConfettiAnimation = false;

  ngOnInit() {
    // Initialize or fetch tasks if needed
  }

  getToDoTasks() {
    return [
      { title: 'Task 1', description: 'Complete initial setup', dueDate: '2024-08-01', priority: 'High' },
      { title: 'Task 2', description: 'Design user interface', dueDate: '2024-08-02', priority: 'Medium' },
      { title: 'Task 3', description: 'Write unit tests', dueDate: '2024-08-03', priority: 'Low' }
    ];
  }

  getInProgressTasks() {
    return [
      { title: 'Task 4', description: 'Develop API endpoints', dueDate: '2024-08-05', priority: 'High' },
      { title: 'Task 5', description: 'Integrate front-end with back-end', dueDate: '2024-08-06', priority: 'Medium' }
    ];
  }

  getReviewTasks() {
    return [
      { title: 'Task 6', description: 'Code review for feature X', dueDate: '2024-08-07', priority: 'High' },
      { title: 'Task 7', description: 'Review pull request #42', dueDate: '2024-08-08', priority: 'Medium' }
    ];
  }

  getDoneTasks() {
    return [
      { title: 'Task 8', description: 'Setup project repository', dueDate: '2024-07-25', priority: 'Low' },
      { title: 'Task 9', description: 'Configure build pipeline', dueDate: '2024-07-26', priority: 'Low' }
    ];
  }

  openTaskModal() {
    this.isModalVisible = true;
  }

  showTaskDetails(task: any) {
    this.selectedTask = task;
    this.openTaskModal();
  }

  markTaskAsDone(task: any) {
    // Remove task from current column and move to Done column
    for (const column of this.columns) {
      const index = column.tasks.indexOf(task);
      if (index > -1) {
        column.tasks.splice(index, 1);
        this.columns.find(col => col.name === 'Done')?.tasks.push(task);
        this.triggerConfetti();
        break;
      }
    }
  }

  triggerConfetti() {
    this.showConfettiAnimation = true;

    // Trigger the confetti animation
    confetti({
      particleCount: 150,  // Number of confetti pieces
      spread: 70,          // Spread of confetti
      origin: { y: 0.6 }   // Vertical position of origin
    });

    // Hide the confetti animation after 2 seconds
    setTimeout(() => this.showConfettiAnimation = false, 2000);
  }

  handleTaskCreation(newTask: any) {
    // Add the new task to the 'To Do' column or any other logic you prefer
    this.columns.find(col => col.name === 'To Do')?.tasks.push(newTask);
    this.isModalVisible = false;
  }
   // Method to count tasks in a given column
   getTaskCount(columnName: string): number {
    const column = this.columns.find(col => col.name === columnName);
    return column ? column.tasks.length : 0;
  }

}
