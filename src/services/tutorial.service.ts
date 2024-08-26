import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private apiUrl = 'http://localhost:8080/api/tutorials';

  constructor(private http: HttpClient) {}

  createTutorial(tutorialData: FormData): Observable<Tutorial> {
    return this.http.post<Tutorial>('http://localhost:8080/api/tutorials/create', tutorialData);
  }

  uploadImage(tutorialId: string, imageType: string, formData: FormData): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${tutorialId}/uploadImage/${imageType}`, formData);
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



  updateTutorial(id: string, formData: FormData): Observable<Tutorial> {
    const headers = { 'enctype': 'multipart/form-data' };
    return this.http.put<Tutorial>(`${this.apiUrl}/${id}`, formData, { headers });
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

   // Fetch a specific tutorial by ID
   getTutorialById(id: string): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
    }
}
