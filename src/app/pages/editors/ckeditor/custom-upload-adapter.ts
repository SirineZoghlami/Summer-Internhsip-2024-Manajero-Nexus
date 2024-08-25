// src/app/pages/editors/ckeditor/custom-upload-adapter.ts
export class CustomUploadAdapter {
  private loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      this.loader.file
        .then((file: any) => {
          data.append('file', file);

          return fetch('http://localhost:8080/api/tutorials/uploadImage', {
            method: 'POST',
            body: data,
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                return response.json().then(json => Promise.reject(json));
              }
            })
            .then(responseData => {
              resolve({
                default: responseData.url
              });
            })
            .catch(error => {
              reject(error);
            });
        });
    });
  }

  abort() {
    // Implement abort logic if needed
  }
}
