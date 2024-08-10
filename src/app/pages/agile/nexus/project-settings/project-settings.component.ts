import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit {
  projectId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    console.log(`ProjectSettingsComponent initialized with project ID: ${this.projectId}`);
  }
  

  getProjectOverviewLink(): string {
    return `/pages/agile/project-settings/${this.projectId}/project-overview`;
  }

  getSprintBacklogLink(): string {
    return `/pages/agile/project-settings/${this.projectId}/sprint-list`;
  }

  getSprintsListLink(): string {
    return `/pages/agile/project-settings/${this.projectId}/sprint-list`;
  }

  getNexusGoalsLink(): string {
    return `/pages/agile/project-settings/${this.projectId}/nexus-goals`;
  }
}
