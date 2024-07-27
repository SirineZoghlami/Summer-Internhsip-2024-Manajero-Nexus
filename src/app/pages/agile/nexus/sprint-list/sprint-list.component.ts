import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnInit {
  sprints = [
    {
      id: '1',
      name: 'Sprint 1',
      description: 'This is the first sprint of the project, focusing on the core features and initial setup. It includes tasks such as user authentication, basic UI design, and setting up the database.',
      startDate: '2024-07-01',
      endDate: '2024-07-14',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Sprint 2',
      description: 'The second sprint aims to enhance user experience and add additional features based on feedback from the first sprint. Key tasks include refining UI/UX, implementing additional functionality, and improving performance.',
      startDate: '2024-07-15',
      endDate: '2024-07-28',
      status: 'Upcoming'
    },
    {
      id: '3',
      name: 'Sprint 3',
      description: 'In this sprint, the focus will be on final testing and bug fixes. The goal is to ensure the application is stable and ready for deployment. Tasks include thorough testing, fixing bugs, and preparing documentation.',
      startDate: '2024-07-29',
      endDate: '2024-08-11',
      status: 'Planned'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  createSprint(): void {
    // Navigate to create sprint
  }

  editSprint(sprintId: string): void {
    // Navigate to edit sprint
  }

  deleteSprint(sprintId: string): void {
    this.sprints = this.sprints.filter(sprint => sprint.id !== sprintId);
  }
}
