import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Tutorial } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private apiUrl = 'http://localhost:8080/api/tutorials';

  constructor(private http: HttpClient) {}

  // Create a new tutorial
  createTutorial(tutorial: Tutorial): Observable<Tutorial> {
    return this.http.post<Tutorial>(`${this.apiUrl}/create`, tutorial)
      .pipe(
        catchError(error => {
          console.error('Error creating tutorial:', error);
          throw error;
        })
      );
  }

  // Fetch all tutorials
  getTutorials(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching tutorials:', error);
          throw error;
        })
      );
  }

  // Fetch the last created tutorial
  getLastCreatedTutorial(): Observable<Tutorial> {
    return this.http.get<Tutorial[]>(this.apiUrl)
      .pipe(
        map(tutorials => tutorials.length > 0 ? tutorials[tutorials.length - 1] : null),
        catchError(error => {
          console.error('Error fetching tutorials:', error);
          throw error;
        })
      );
  }

  // Upload image for a tutorial
  uploadImage(tutorialId: string, file: File): Observable<Tutorial> {
    const formData = new FormData();
    formData.append('file', file);

    const uploadUrl = `${this.apiUrl}/${tutorialId}/uploadImage`;
    const httpOptions = {
      headers: new HttpHeaders({ 'enctype': 'multipart/form-data' })
    };

    return this.http.post<Tutorial>(uploadUrl, formData, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error uploading image:', error);
          throw error;
        })
      );
  }

  // Update an existing tutorial
  updateTutorial(tutorial: Tutorial): Observable<Tutorial> {
    return this.http.put<Tutorial>(`${this.apiUrl}/${tutorial.id}`, tutorial)
      .pipe(
        catchError(error => {
          console.error('Error updating tutorial:', error);
          throw error;
        })
      );
  }
}
