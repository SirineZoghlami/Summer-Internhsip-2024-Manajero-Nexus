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
  roleImagePreview: string | ArrayBuffer;
  processImagePreview: string | ArrayBuffer;
  selectedRoleImage: File; // Added property
  selectedProcessImage: File; // Added property
  Editor = ClassicEditor;
  editorConfig = {
    // Your CKEditor configuration
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tutorialService: TutorialService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.route.paramMap.subscribe(params => {
      this.tutorialId = params.get('id');
      if (this.tutorialId) {
        this.loadTutorial(this.tutorialId);
      }
    });
  }

  initializeForm() {
    this.tutorialForm = this.fb.group({
      introduction: [''],
      whyUse: [''],
      whatIsNexus: [''],
      howDoesItWork: [''],
      limitations: [''],
      applyingNexus: [''],
      conclusion: [''],
      roleImageUrl: [null],
      processImageUrl: [null]
    });
  }

  loadTutorial(id: string) {
    this.tutorialService.getTutorialById(id).subscribe(
      (tutorial: Tutorial) => {
        this.tutorialForm.patchValue({
          introduction: tutorial.introduction,
          whyUse: tutorial.whyUse,
          whatIsNexus: tutorial.whatIsNexus,
          howDoesItWork: tutorial.howDoesItWork,
          limitations: tutorial.limitations,
          applyingNexus: tutorial.applyingNexus,
          conclusion: tutorial.conclusion
        });
        this.roleImagePreview = tutorial.roleImageUrl ? `http://localhost:8080${tutorial.roleImageUrl}` : '';
        this.processImagePreview = tutorial.processImageUrl ? `http://localhost:8080${tutorial.processImageUrl}` : '';
      },
      error => {
        console.error('Error loading tutorial:', error);
        this.toastrService.danger('Failed to load tutorial: ' + error.message, 'Error');
      }
    );
  }
  onRoleImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file: File = input.files[0];
      this.selectedRoleImage = file; // Set the selected file
      this.tutorialForm.patchValue({ roleImage: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.roleImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onProcessImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file: File = input.files[0];
      this.selectedProcessImage = file; // Set the selected file
      this.tutorialForm.patchValue({ processImage: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.processImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateTutorial(): void {
    if (this.tutorialForm.invalid) {
      this.toastrService.danger('Please fill in all required fields.', 'Error');
      return;
    }
  
    const formData = new FormData();
    formData.append('tutorial', new Blob([JSON.stringify(this.tutorialForm.value)], { type: 'application/json' }));
  
    if (this.selectedRoleImage) {
      formData.append('roleImage', this.selectedRoleImage);
    }
  
    if (this.selectedProcessImage) {
      formData.append('processImage', this.selectedProcessImage);
    }
  
    this.tutorialService.updateTutorial(this.tutorialId, formData).subscribe(
      response => {
        this.toastrService.success('Tutorial updated successfully!', 'Success');
        this.router.navigate(['/pages/agile/nexus']);
      },
      error => {
        this.toastrService.danger('Failed to update tutorial.', 'Error');
        console.error('Error updating tutorial:', error);
      }
    );
  }
}