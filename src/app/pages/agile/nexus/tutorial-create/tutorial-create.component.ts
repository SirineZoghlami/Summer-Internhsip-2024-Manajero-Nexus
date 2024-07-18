import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TutorialService } from '../../../../../services/tutorial.service';
import { Tutorial } from '../../../../../models/tutorial.model';
import { NbToastrService } from '@nebular/theme';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'ngx-tutorial-create',
  templateUrl: './tutorial-create.component.html',
  styleUrls: ['./tutorial-create.component.scss']
})
export class TutorialCreateComponent implements OnInit {
  public Editor = ClassicEditor;
  tutorialForm: FormGroup;
  editorConfig: any;

  constructor(
    private formBuilder: FormBuilder,
    private tutorialService: TutorialService,
    private toastrService: NbToastrService
  ) {
    this.editorConfig = {
      toolbar: {
        items: [
          'heading', '|',
          'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code', '|',
          'link', 'blockquote', 'codeBlock', '|',
          'bulletedList', 'numberedList', 'todoList', '|',
          'indent', 'outdent', '|',
          'imageUpload', 'insertTable', 'mediaEmbed', '|',
          'undo', 'redo', '|',
          'alignment', 'fontBackgroundColor', 'fontColor', 'fontSize', 'fontFamily', 'highlight', '|',
          'horizontalLine', 'pageBreak', 'removeFormat'
        ]
      },
      image: {
        toolbar: [
          'imageTextAlternative', 'imageStyle:full', 'imageStyle:side', 'linkImage'
        ]
      },
      table: {
        contentToolbar: [
          'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'
        ]
      },
      mediaEmbed: {
        previewsInData: true
      },
      // Other configurations
      language: 'en',
      simpleUpload: {
        uploadUrl: '/path/to/upload/image' // Replace with your image upload URL
      }
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
    if (this.tutorialForm.invalid) {
      this.toastrService.danger('Please fill in all required fields.', 'Error');
      return;
    }

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
