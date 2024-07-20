import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TutorialService } from '../../../../../services/tutorial.service';
import { Tutorial } from '../../../../../models/tutorial.model';
import { NbToastrService } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-tutorial-create',
  templateUrl: './tutorial-create.component.html',
  styleUrls: ['./tutorial-create.component.scss']
})
export class TutorialCreateComponent implements OnInit {
  public Editor = ClassicEditor;
  tutorialForm: FormGroup;
  editorConfig: any;
  currentStepIndex = 0;

  @ViewChild('introductionEditor') introductionEditor: CKEditorComponent;
  @ViewChild('whyUseEditor') whyUseEditor: CKEditorComponent;
  @ViewChild('whatIsNexusEditor') whatIsNexusEditor: CKEditorComponent;
  @ViewChild('howDoesItWorkEditor') howDoesItWorkEditor: CKEditorComponent;
  @ViewChild('limitationsEditor') limitationsEditor: CKEditorComponent;
  @ViewChild('applyingNexusEditor') applyingNexusEditor: CKEditorComponent;
  @ViewChild('conclusionEditor') conclusionEditor: CKEditorComponent;

  constructor(
    private formBuilder: FormBuilder,
    private tutorialService: TutorialService,
    private toastrService: NbToastrService,
    private router: Router
  ) {
    this.editorConfig = this.createEditorConfig();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createEditorConfig(): any {
    return {
      toolbar: {
        items: [
          'heading', '|',
          'bold', 'italic', '|',
          'link', 'blockquote', '|',
          'bulletedList', 'numberedList', '|',
          'indent', 'outdent', '|',
          'imageUpload', 'insertTable', '|',
          'undo', 'redo'
        ]
      },
      // Additional config if needed
    };
  }

  private createForm(): void {
    this.tutorialForm = this.formBuilder.group({
      introduction: ['', Validators.required],
      whyUse: ['', Validators.required],
      whatIsNexus: ['', Validators.required],
      howDoesItWork: ['', Validators.required],
      limitations: ['', Validators.required],
      applyingNexus: ['', Validators.required],
      conclusion: ['', Validators.required]
    });
  }

  onEditorChange(event, field: string): void {
    this.tutorialForm.get(field).setValue(event.editor.getData());
  }

  onReady(field: string): void {
    const editor = this[field + 'Editor'].editorInstance;
    editor.model.document.on('change:data', () => this.onEditorChange({ editor }, field));
  }

  createTutorial(): void {
    if (this.tutorialForm.invalid) {
      this.toastrService.danger('Please fill in all required fields.', 'Error');
      return;
    }

    this.tutorialService.createTutorial(this.tutorialForm.value as Tutorial).subscribe(
      () => {
        this.toastrService.success('Tutorial created successfully!', 'Success');
        this.router.navigate(['/tutorials']);
      },
      error => {
        this.toastrService.danger('Error creating tutorial. Please try again.', 'Error');
      }
    );
  }

  nextStep(): void {
    if (this.currentStepIndex < 6) {
      this.currentStepIndex++;
    }
  }

  previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }
}
