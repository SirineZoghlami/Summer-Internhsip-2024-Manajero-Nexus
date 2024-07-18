import { FileLoader } from '@ckeditor/ckeditor5-upload';

export class CustomUploadAdapter {
  private loader: FileLoader;
  private uploadUrl: string;

  constructor(loader: FileLoader, uploadUrl: string) {
    this.loader = loader;
    this.uploadUrl = uploadUrl;
  }

  upload() {
    return new Promise((resolve, reject) => {
      if (this.loader.file instanceof File) {
        const data = new FormData();
        data.append('file', this.loader.file);

        fetch(this.uploadUrl, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(responseData => {
          if (responseData && responseData.url) {
            resolve({ default: responseData.url });
          } else {
            reject('Image upload failed.');
          }
        })
        .catch(error => reject(error));
      } else {
        reject('File is not valid.');
      }
    });
  }

  abort() {
    // Handle abort logic here (if needed)
  }
}
