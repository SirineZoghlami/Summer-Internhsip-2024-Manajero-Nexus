import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../../../../../models/tutorial.model';
import { TutorialService } from '../../../../../services/tutorial.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../../../agile/nexus/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ngx-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  lastCreatedTutorial: Tutorial = {
    id: '',
    introduction: '',
    whyUse: '',
    whatIsNexus: '',
    howDoesItWork: '',
    limitations: '',
    applyingNexus: '',
    conclusion: '',
    processImageUrl: '',
    roleImageUrl: ''

  };
  currentStepIndex: number = 0;
  isDatabaseEmpty: boolean = false;

  tutorialSteps = [
    { label: 'Introduction', title: 'Introduction', contentField: 'introduction'},
    { label: 'Why Use the Nexus Agile Framework?', title: 'Why Use the Nexus Agile Framework?', contentField: 'whyUse' },
    { label: 'What is Nexus?', title: 'What is Nexus?', contentField: 'whatIsNexus', imageField: 'whatIsNexusImageUrl'},
    { label: 'How Does It Work?', title: 'How Does It Work?', contentField: 'howDoesItWork' },
    { label: 'Limitations', title: 'Limitations', contentField: 'limitations' },
    { label: 'Applying Nexus in the Real World', title: 'Applying Nexus in the Real World', contentField: 'applyingNexus' },
    { label: 'Role Image', title: 'Role Image', imageField: 'roleImageUrl'}, // Add this step for the role image
    { label: 'Process Image', title: 'Process Image', imageField: 'processImageUrl'}, // Add this step for the process image
    { label: 'Conclusion', title: 'Conclusion', contentField: 'conclusion'}
  ];
  

  constructor(
    private router: Router,
    private tutorialService: TutorialService,
    private sanitizer: DomSanitizer,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.fetchLastCreatedTutorial();
  }

  fetchLastCreatedTutorial(): void {
    this.tutorialService.getLastCreatedTutorial().subscribe(
      (tutorial: Tutorial) => {
        if (!tutorial || !tutorial.id) {
          this.isDatabaseEmpty = true;
        } else {
          this.lastCreatedTutorial = tutorial;
        }
      },
      error => {
        console.error('Error fetching last created tutorial:', error);
        this.toastrService.danger('Failed to fetch tutorial');
      }
    );
  }
  

  navigateToQuiz(): void {
    this.router.navigate(['/pages/agile/nexus/quizz']);
  }

  previousStep(): void {
    if (this.currentStepIndex > 0) this.currentStepIndex--;
  }
  tryThisMethod():void{
    this.router.navigate(['/pages/agile/nexus/project/create']);
  }
  nextStep(): void {
    if (this.currentStepIndex < this.tutorialSteps.length - 1) this.currentStepIndex++;
  }

  getSanitizedContent(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  modifyTutorial(): void {
    if (this.lastCreatedTutorial?.id) {
      this.router.navigate(['/pages/agile/nexus/tutorial/update', this.lastCreatedTutorial.id]);
    }
  }

  confirmDelete(): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this tutorial?'
      }
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) this.deleteTutorial();
    });
  }

  deleteTutorial(): void {
    if (this.lastCreatedTutorial?.id) {
      this.tutorialService.deleteTutorial(this.lastCreatedTutorial.id).subscribe(
        () => {
          this.toastrService.success('Tutorial deleted successfully');
          this.router.navigate(['/pages/agile/nexus/tutorial/create']);
        },
        error => {
          console.error('Error deleting tutorial:', error);
          this.toastrService.danger('Failed to delete tutorial');
        }
      );
    }
  }


  getImageUrl(imagePath: string): string {
    return `http://localhost:8085/ManajeroBackend${imagePath}`;
  }
  
}