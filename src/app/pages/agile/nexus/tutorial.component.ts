import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../../../../models/tutorial.model';
import { TutorialService } from '../../../../services/tutorial.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'; // Import DomSanitizer
import { NbDialogService, NbToastrService } from '@nebular/theme'; // Import NbDialogService and NbToastrService
import { ConfirmationDialogComponent } from '../../agile/nexus/confirmation-dialog/confirmation-dialog.component'; // Corrected import path

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
    private sanitizer: DomSanitizer, // Inject DomSanitizer
    private dialogService: NbDialogService, // Inject NbDialogService
    private toastrService: NbToastrService // Inject NbToastrService
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

  confirmDelete(): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this tutorial?'
      }
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteTutorial();
      }
    });
  }

  deleteTutorial(): void {
    if (this.lastCreatedTutorial) {
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
