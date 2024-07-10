import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TutorialService } from '../../../../../services/tutorial.service';
import { Tutorial } from '../../../../../models/tutorial.model';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-tutorial-create',
  templateUrl: './tutorial-create.component.html',
  styleUrls: ['./tutorial-create.component.scss']
})
export class TutorialCreateComponent implements OnInit {
  tutorialForm: FormGroup;
  tutorial: Tutorial;

  constructor(
    private formBuilder: FormBuilder,
    private tutorialService: TutorialService,
    private toastrService: NbToastrService
  ) {
    this.tutorial = {
      id: null,
      introduction: '',
      whyUse: '',
      whatIsNexus: '',
      howDoesItWork: '',
      limitations: '',
      applyingNexus: '',
      conclusion: ''
    };
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.tutorialForm = this.formBuilder.group({
      introduction: [''],
      whyUse: [''],
      whatIsNexus: [''],
      howDoesItWork: [''],
      limitations: [''],
      applyingNexus: [''],
      conclusion: ['']
    });
  }

  createTutorial(): void {
    this.tutorial = this.tutorialForm.value; // Update tutorial object with form values

    this.tutorialService.createTutorial(this.tutorial).subscribe(
        response => {
            console.log('Tutorial created:', response);
            this.toastrService.success('Tutorial created successfully!', 'Success');
            this.resetForm();
        },
        error => {
            console.error('Error creating tutorial:', error);
            this.toastrService.danger('Failed to create tutorial. Please try again.', 'Error');
        }
    );
  }

  resetForm(): void {
    this.tutorialForm.reset();
    this.tutorial = {
      id: null,
      introduction: '',
      whyUse: '',
      whatIsNexus: '',
      howDoesItWork: '',
      limitations: '',
      applyingNexus: '',
      conclusion: ''
    };
  }

}
