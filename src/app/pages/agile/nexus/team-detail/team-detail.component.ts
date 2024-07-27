import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  team = {
    name: '',
    description: '',
    members: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    // Fetch the team details based on route parameter
    this.route.paramMap.subscribe(params => {
      const teamId = params.get('id');
      if (teamId) {
        this.loadTeamDetails(teamId);
      }
    });
  }

  loadTeamDetails(teamId: string): void {
    // Mock data for demonstration
    // Replace this with a service call to fetch actual data
    this.team = {
      name: `Team ${teamId}`,
      description: `Description for Team ${teamId}`,
      members: 'Member1, Member2, Member3'
    };
  }

  saveTeam(): void {
    // Logic to save team details
    this.toastrService.success('Team details saved successfully');
  }

  cancel(): void {
    // Navigate back to the previous page
    this.router.navigate(['/pages/agile/nexus/teams']);
  }
}

