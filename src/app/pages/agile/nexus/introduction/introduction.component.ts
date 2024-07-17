import { Component, OnInit } from "@angular/core";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Introduction } from "../../../../../models/introduction.model";
import { IntroductionService } from "../../../../../services/introduction/introduction.service";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  public Editor = ClassicEditor;
  introductions: Introduction[] = [];
  currentIntroduction: Introduction = { id: '', content: '', imageUrl: '' };
  editorVisible: boolean = false; // To control editor visibility
  fileToUpload: File | null = null;

  constructor(private introductionService: IntroductionService) { }

  ngOnInit(): void {
    this.loadLastIntroduction();
  }

  loadLastIntroduction(): void {
    this.introductionService.getAll().subscribe(data => {
      if (data.length > 0) {
        this.currentIntroduction = data[data.length - 1]; // Retrieve the last introduction
      }
      console.log('Loaded last introduction:', this.currentIntroduction);
    }, error => {
      console.error('Error loading last introduction:', error);
    });
  }

  saveIntroduction(): void {
    // Handle saving introduction here
    console.log('Saving introduction:', this.currentIntroduction);
    this.closeEditor();
    this.resetForm();
  }

  editIntroduction(introduction: Introduction): void {
    this.currentIntroduction = { ...introduction };
    this.openEditor();
  }

  deleteIntroduction(id: string): void {
    // Handle deletion here
    console.log('Deleting introduction with id:', id);
    this.closeEditor();
    this.resetForm();
  }

  openEditor(): void {
    this.editorVisible = true;
  }

  closeEditor(): void {
    this.editorVisible = false;
  }

  handleFileInput(files: FileList | null): void {
    if (files && files.length > 0) {
      this.fileToUpload = files.item(0);
    }
  }

  private resetForm(): void {
    this.currentIntroduction = { id: '', content: '', imageUrl: '' };
    this.fileToUpload = null;
  }
}
