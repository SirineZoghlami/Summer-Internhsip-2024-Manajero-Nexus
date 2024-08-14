import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit {
  projectId!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    console.log(`ProjectSettingsComponent initialized with project ID: ${this.projectId}`);
  }
  

  getProjectOverviewLink(): string {
    return `/pages/agile/project-settings/${this.projectId}/project-overview`;
  }

  getProductBacklogLink(): string {
    return `/pages/agile/project-settings/${this.projectId}/nexus-product-backlog`;
  }

  getSprintsListLink(): string {
    return `/pages/agile/project-settings/${this.projectId}/sprint-list`;
  }

  getNexusGoalsLink(): string {
    return `/pages/agile/project-settings/${this.projectId}/nexus-goals`;
  }


  navigateToProjects(): void {
    this.router.navigate(['pages/agile/nexus/project']); 
  }

}
