import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-detail',
  templateUrl: './sprint-detail.component.html',
  styleUrls: ['./sprint-detail.component.scss']
})
export class SprintDetailComponent implements OnInit {
  sprint = {
    name: 'Sprint 1',
    description: 'Description for Sprint 1'
  };

  constructor() {}

  ngOnInit(): void {}

  saveSprint(): void {
    // Save sprint details
  }

  cancel(): void {
    // Cancel and go back
  }
}
