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
  editorConfig: any; // Define editorConfig as any type

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

    // CKEditor configuration
    this.editorConfig = {
      toolbar: [
        { name: 'document', items: ['Source', '-', 'NewPage', 'Preview', '-', 'Templates'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
        '/',
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'] },
        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
        { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
        '/',
        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks', '-', 'About'] }
      ],
      // Optionally configure the CKEditor instance further
      // Example: height: '400px'
      // Example: language: 'en'
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
    const tutorial: Tutorial = this.tutorialForm.value;

    this.tutorialService.createTutorial(tutorial).subscribe(
      response => {
        console.log('Tutorial created:', response);
        this.toastrService.success('Tutorial created successfully!', 'Success');
        this.resetForm();
      },
      error => {
        console.error('Error creating tutorial:', error);
        this.toastrService.danger('Failed to create tutorial: ' + error.message, 'Error');
      }
    );
  }

  resetForm(): void {
    this.tutorialForm.reset();
  }
}