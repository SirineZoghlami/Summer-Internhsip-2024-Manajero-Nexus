import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'ngx-ckeditor',
  template: `
    <ckeditor [editor]="Editor" [config]="editorConfig" data="<p>Hello, world!</p>"></ckeditor>
  `,
})
export class CKEditorComponent {
  public Editor = ClassicEditor;
  public editorConfig = {
    plugins: [
      'heading', 'bold', 'italic', 'fontColor', 'fontBackgroundColor',
      'bulletedList', 'numberedList', 'alignment', 'indent', 'outdent',
      'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo',
      'imageUpload' // Ensure imageUpload plugin is included
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
}  