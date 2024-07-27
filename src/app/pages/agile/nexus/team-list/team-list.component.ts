import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams = [
    { id: '1', name: 'Team A', description: 'Description for Team A' },
    { id: '2', name: 'Team B', description: 'Description for Team B' },
    { id: '3', name: 'Team C', description: 'Description for Team C' }
  ];

  constructor() {}

  ngOnInit(): void {}

  createTeam(): void {
    // Navigate to create team
  }

  editTeam(teamId: string): void {
    // Navigate to edit team
  }

  deleteTeam(teamId: string): void {
    this.teams = this.teams.filter(team => team.id !== teamId);
  }
}
