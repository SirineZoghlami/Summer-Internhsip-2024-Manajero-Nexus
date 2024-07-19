import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TutorialService } from '../../../../../services/tutorial.service';
import { Tutorial } from '../../../../../models/tutorial.model';
import { NbToastrService } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapter } from '../../../../pages/editors/ckeditor/custom-upload-adapter'; // Adjust path as needed
import { Router } from '@angular/router'; // Import Router
import { Validators } from '@angular/forms';

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
    private toastrService: NbToastrService,
    private router: Router // Inject Router
  ) {
    this.editorConfig = {
      toolbar: {
        items: [
          'heading', '|',
          'bold', 'italic', '|',
          'link', 'blockquote', '|',
          'bulletedList', 'numberedList', '|',
          'indent', 'outdent', '|',
          'imageUpload', 'insertTable', 'mediaEmbed', '|',
          'undo', 'redo'
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
      language: 'en'
    };
  }

  ngOnInit(): void {
    this.createForm();
    this.initializeEditor();
  }

  createForm(): void {
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
        this.router.navigate(['/pages/agile/nexus/tutorial']); // Navigate to the desired route
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

  initializeEditor(): void {
    ClassicEditor
      .create(document.querySelector('#editor') as HTMLElement, {
        ...this.editorConfig,
        extraPlugins: [this.MyCustomUploadAdapterPlugin]
      })
      .then(editor => {
        console.log('Editor initialized successfully');
      })
      .catch(error => {
        console.error('Error initializing editor:', error);
      });
  }

  MyCustomUploadAdapterPlugin(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new CustomUploadAdapter(loader, 'http://localhost:8080/api/tutorials/uploadImage');
    };
  }
}
