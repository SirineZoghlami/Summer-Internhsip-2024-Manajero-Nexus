import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../../../../core/models/nexus-models/tutorial.model';
import { TutorialService } from '../../../../core/services/nexus-services/tutorial.service';

@Component({
  selector: 'ngx-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  tutorial: Tutorial | null = null;

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.tutorialService.getLastCreatedTutorial().subscribe(
      (tutorial: Tutorial | null) => {
        this.tutorial = tutorial;
      },
      (error) => {
        console.error('Error fetching last created tutorial:', error);
      }
    );
  }
}
