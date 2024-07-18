import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../../../../models/tutorial.model';
import { TutorialService } from '../../../../services/tutorial.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'; // Import DomSanitizer

@Component({
  selector: 'ngx-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  lastCreatedTutorial: Tutorial;
  currentStepIndex: number = 0;

  constructor(
    private router: Router,
    private tutorialService: TutorialService,
    private sanitizer: DomSanitizer // Inject DomSanitizer
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
      }
    );
  }

  previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  nextStep(): void {
    if (this.currentStepIndex < 6) {
      this.currentStepIndex++;
    }
  }

  getSanitizedContent(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  modifyTutorial(): void {
    if (this.lastCreatedTutorial) {
      this.router.navigate(['/pages/agile/nexus/tutorial/update', this.lastCreatedTutorial.id]);
    }
  }
}
