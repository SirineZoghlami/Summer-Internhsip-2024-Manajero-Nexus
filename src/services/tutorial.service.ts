import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Tutorial } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private apiUrl = 'http://localhost:8080/api/tutorials';

  constructor(private http: HttpClient) {}

  // Create a new tutorial
  createTutorial(tutorial: Tutorial, file: File): Observable<Tutorial> {
    const formData: FormData = new FormData();
    formData.append('tutorial', new Blob([JSON.stringify(tutorial)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Tutorial>(`${this.apiUrl}/create`, formData);
  }

  // Fetch all tutorials
  getTutorials(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fetch the last created tutorial
  getLastCreatedTutorial(): Observable<Tutorial | null> {
    return this.http.get<Tutorial[]>(this.apiUrl)
      .pipe(
        map(tutorials => tutorials.length > 0 ? tutorials[tutorials.length - 1] : null),
        catchError(this.handleError)
      );
  }

  // Upload image for a tutorial
  uploadImage(tutorialId: string, formData: FormData): Observable<any> {
    const uploadUrl = `${this.apiUrl}/${tutorialId}/uploadImage`;

    return this.http.post<any>(uploadUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an existing tutorial
  updateTutorial(tutorial: Tutorial): Observable<Tutorial> {
    return this.http.put<Tutorial>(`${this.apiUrl}/${tutorial.id}`, tutorial)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a tutorial
  deleteTutorial(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Generic error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
