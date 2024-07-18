import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorialService } from '../../../../../services/tutorial.service';
import { Tutorial } from '../../../../../models/tutorial.model';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ConfirmationDialogComponent } from '../../../agile/nexus/confirmation-dialog/confirmation-dialog.component'; // Corrected import path

@Component({
  selector: 'app-tutorial-update',
  templateUrl: './tutorial-update.component.html',
  styleUrls: ['./tutorial-update.component.scss']
})
export class TutorialUpdateComponent implements OnInit {
  tutorialForm: FormGroup;
  tutorialId: string;
  Editor = ClassicEditor;
  editorConfig = {
    // Your CKEditor configuration
  };

  constructor(
    private fb: FormBuilder,
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.tutorialId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    this.loadTutorial();
  }

  initializeForm() {
    this.tutorialForm = this.fb.group({
      introduction: [''],
      whyUse: [''],
      whatIsNexus: [''],
      howDoesItWork: [''],
      limitations: [''],
      applyingNexus: [''],
      conclusion: ['']
    });
  }

  loadTutorial() {
    this.tutorialService.getTutorials().subscribe(tutorials => {
      const tutorial = tutorials.find(t => t.id === this.tutorialId);
      if (tutorial) {
        this.tutorialForm.patchValue({
          introduction: tutorial.introduction,
          whyUse: tutorial.whyUse,
          whatIsNexus: tutorial.whatIsNexus,
          howDoesItWork: tutorial.howDoesItWork,
          limitations: tutorial.limitations,
          applyingNexus: tutorial.applyingNexus,
          conclusion: tutorial.conclusion
        });
      }
    });
  }

  updateTutorial() {
    if (this.tutorialForm.valid) {
      const dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
        context: {
          title: 'Confirm Update',
          message: 'Are you sure you want to modify this tutorial?'
        }
      });

      dialogRef.onClose.subscribe(confirmed => {
        if (confirmed) {
          const updatedTutorial: Tutorial = {
            ...this.tutorialForm.value,
            id: this.tutorialId
          };
          this.tutorialService.updateTutorial(updatedTutorial).subscribe(
            () => {
              this.toastrService.success('Tutorial updated successfully!', 'Success');
              this.router.navigate(['pages/agile/nexus/tutorial']);
            },
            error => {
              console.error('Error updating tutorial:', error);
              this.toastrService.danger('Failed to update tutorial: ' + error.message, 'Error');
            }
          );
        }
      });
    }
  }
}