import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../../../../models/tutorial.model';
import { TutorialService } from '../../../../services/tutorial.service';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'ngx-tutorial-create',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  lastCreatedTutorial: Tutorial;
  currentStepIndex: number = 0;

  constructor(
    private router: Router,  // Inject Router
    private tutorialService: TutorialService
  ) { }

  ngOnInit(): void {
    this.fetchLastCreatedTutorial();
  }

  fetchLastCreatedTutorial(): void {
    this.tutorialService.getLastCreatedTutorial().subscribe(
      (tutorial: Tutorial) => {
        this.lastCreatedTutorial = tutorial;
        console.log('Last created tutorial:', tutorial);
      },
      error => {
        console.error('Error fetching last created tutorial:', error);
        // Handle error, e.g., show toast message or set default value
      }
    );
  }

  previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  nextStep(): void {
    if (this.currentStepIndex < 6) { // Assuming there are 7 steps (0-indexed)
      this.currentStepIndex++;
    }
  }
}
