import { Component, OnInit, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TutorialService } from '../../../../services/tutorial.service';
import { CustomUploadAdapter } from './custom-upload-adapter'; // Ensure the path is correct

@Component({
  selector: 'ngx-ckeditor',
  template: `
    <ckeditor
      [editor]="Editor"
      [config]="editorConfig"
      (ready)="onEditorReady($event)"
      data="<p>Hello, world!</p>"
    ></ckeditor>
  `,
})
export class CKEditorComponent implements OnInit {
  public Editor = ClassicEditor;
  public editorConfig = {
    plugins: [
      'heading', 'bold', 'italic', 'fontColor', 'fontBackgroundColor',
      'bulletedList', 'numberedList', 'alignment', 'indent', 'outdent',
      'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo',
      'imageUpload'
    ],
    toolbar: {
      items: [
        'heading', '|', 'bold', 'italic', 'underline', 'fontColor', 'fontBackgroundColor', '|',
        'bulletedList', 'numberedList', '|',
        'alignment', 'indent', 'outdent', '|',
        'blockQuote', 'insertTable', '|',
        'undo', 'redo'
      ]
    },
    image: {
      toolbar: [
        'imageTextAlternative',
        '|',
        'imageStyle:alignLeft',
        'imageStyle:full',
        'imageStyle:alignRight'
      ],
      styles: [
        'full',
        'alignLeft',
        'alignRight'
      ]
    },
    height: '320',
  };

  @ViewChild('introductionEditor') introductionEditor: any;
  @ViewChild('whyUseEditor') whyUseEditor: any;
  @ViewChild('whatIsNexusEditor') whatIsNexusEditor: any;
  @ViewChild('howDoesItWorkEditor') howDoesItWorkEditor: any;
  @ViewChild('limitationsEditor') limitationsEditor: any;
  @ViewChild('applyingNexusEditor') applyingNexusEditor: any;
  @ViewChild('conclusionEditor') conclusionEditor: any;

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    // Any initialization if needed
  }

  onEditorReady(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new CustomUploadAdapter(loader); // Only pass loader if that's all that's expected
    };
  }
}
