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
    // Fetch the project ID from the route parameters
    this.projectId = this.route.snapshot.paramMap.get('id')!;
  }

  getProjectOverviewLink(): string {
    return `/pages/agile/project-overview/${this.projectId}`;
  }

  getSprintBacklogLink(): string {
    return `/pages/agile/sprint-backlog/${this.projectId}`;
  }

 
  getSprintsListLink(): string {
    return `/pages/agile/sprint-list/${this.projectId}`;
  }

  getNexusGoalsLink(): string {
    return `/pages/agile/nexus-golas/${this.projectId}`;
  }
}
