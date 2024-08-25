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
  selectedRoleImage: File | null = null;
  selectedProcessImage: File | null = null;
  roleImagePreview: string | ArrayBuffer | null = null;
  processImagePreview: string | ArrayBuffer | null = null;

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
      roleImageUrl: [''],
      processImageUrl: ['']
    });
  }
  createTutorial(): void {
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
  
    this.tutorialService.createTutorial(formData).subscribe(
      response => {
        const tutorialId = response.id;
        this.toastrService.success('Tutorial created successfully!', 'Success');
        this.router.navigate(['/pages/agile/nexus']);
      },
      error => {
        this.toastrService.danger('Failed to create tutorial.', 'Error');
      }
    );
  }

  uploadRoleImage(tutorialId: string): void {
    if (this.selectedRoleImage) {
      const formData = new FormData();
      formData.append('file', this.selectedRoleImage);

      this.tutorialService.uploadImage(tutorialId, 'roleImage', formData).subscribe(
        (imageUrl: string) => {
          this.tutorialForm.patchValue({ roleImageUrl: imageUrl });
          this.uploadProcessImage(tutorialId);
        },
        error => {
          this.toastrService.danger('Failed to upload role image: ' + error.message, 'Error');
        }
      );
    } else {
      this.uploadProcessImage(tutorialId);
    }
  }

  uploadProcessImage(tutorialId: string): void {
    if (this.selectedProcessImage) {
      const formData = new FormData();
      formData.append('file', this.selectedProcessImage);

      this.tutorialService.uploadImage(tutorialId, 'processImage', formData).subscribe(
        (imageUrl: string) => {
          this.tutorialForm.patchValue({ processImageUrl: imageUrl });
          this.toastrService.success('Tutorial created successfully!', 'Success');
          this.router.navigate(['/pages/agile/nexus/tutorial']);
        },
        error => {
          this.toastrService.danger('Failed to upload process image: ' + error.message, 'Error');
        }
      );
    } else {
      this.toastrService.success('Tutorial created successfully!', 'Success');
      this.router.navigate(['/pages/agile/nexus/tutorial']);
    }
  }

  onRoleImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedRoleImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.roleImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onProcessImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedProcessImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.processImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
