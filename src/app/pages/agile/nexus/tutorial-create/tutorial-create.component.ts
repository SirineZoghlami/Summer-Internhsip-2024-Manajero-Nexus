import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TutorialService } from '../../../../../services/tutorial.service';
import { Tutorial } from '../../../../../models/tutorial.model';
import { NbToastrService } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private tutorialService: TutorialService,
    private toastrService: NbToastrService,
    private router: Router
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
      language: 'en',
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
      conclusion: [''],
      imageUrl: ['']  // Add imageUrl field here
    });
  }

  createTutorial(): void {
    if (this.tutorialForm.invalid) {
      this.toastrService.danger('Please fill in all required fields.', 'Error');
      return;
    }

    const tutorial: Tutorial = this.tutorialForm.value;

    this.tutorialService.createTutorial(tutorial, this.selectedFile).subscribe(
      response => {
        this.toastrService.success('Tutorial created successfully!', 'Success');
      },
      error => {
        this.toastrService.danger('Failed to create tutorial.', 'Error');
      }
    );
  }


  uploadImage(tutorialId: string): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.tutorialService.uploadImage(tutorialId, formData).subscribe(
        (imageUrl: string) => {
          this.tutorialForm.patchValue({ imageUrl });  // Update form with imageUrl
          this.toastrService.success('Image uploaded successfully!', 'Success');
          this.resetForm();
          this.router.navigate(['/pages/agile/nexus/tutorial']);
        },
        error => {
          this.toastrService.danger('Failed to upload image: ' + error.message, 'Error');
        }
      );
    }
  }

  resetForm(): void {
    this.tutorialForm.reset();
    this.selectedFile = null;
    this.selectedImage = null;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
