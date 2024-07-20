import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../../../../models/tutorial.model';
import { TutorialService } from '../../../../services/tutorial.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService, NbToastrService } from '@nebular/theme'; 
import { ConfirmationDialogComponent } from '../../agile/nexus/confirmation-dialog/confirmation-dialog.component'; 

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
    conclusion: ''
  };
  currentStepIndex: number = 0;

  // Define tutorialSteps
  tutorialSteps = [
    { label: 'Introduction', title: 'Introduction', contentField: 'introduction', imageField: '', imageAlt: '' },
    { label: 'Why Use the Nexus Agile Framework?', title: 'Why Use the Nexus Agile Framework?', contentField: 'whyUse', imageField: '', imageAlt: '' },
    { label: 'What is Nexus?', title: 'What is Nexus?', contentField: 'whatIsNexus', imageField: 'whatIsNexusImageUrl', imageAlt: 'What is Nexus image' },
    { label: 'How Does It Work?', title: 'How Does It Work?', contentField: 'howDoesItWork', imageField: 'howDoesItWorkImageUrl', imageAlt: 'How does it work image' },
    { label: 'Limitations', title: 'Limitations', contentField: 'limitations', imageField: '', imageAlt: '' },
    { label: 'Applying Nexus in the Real World', title: 'Applying Nexus in the Real World', contentField: 'applyingNexus', imageField: '', imageAlt: '' },
    { label: 'Conclusion', title: 'Conclusion', contentField: 'conclusion', imageField: '', imageAlt: '' }
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
      (tutorial: Tutorial) => this.lastCreatedTutorial = tutorial,
      error => {
        console.error('Error fetching last created tutorial:', error);
        this.toastrService.danger('Failed to fetch tutorial'); // Show error toast
      }
    );
  }

  navigateToQuiz(): void {
    this.router.navigate(['/pages/agile/nexus/quizz']);
  }

  previousStep(): void {
    if (this.currentStepIndex > 0) this.currentStepIndex--;
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
          this.toastrService.success('Tutorial deleted successfully'); // Show success toast
          this.router.navigate(['/pages/agile/nexus/tutorial/create']); // Navigate to create tutorial page
        },
        error => {
          console.error('Error deleting tutorial:', error);
          this.toastrService.danger('Failed to delete tutorial'); // Show error toast if deletion fails
        }
      );
    }
  }
}
