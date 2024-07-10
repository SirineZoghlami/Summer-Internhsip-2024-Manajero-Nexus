import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private apiUrl = 'http://localhost:8080/api/tutorials';

  constructor(private http: HttpClient) {}

  // Create a new tutorial
  createTutorial(tutorial: Tutorial): Observable<Tutorial> {
    return this.http.post<Tutorial>(this.apiUrl, tutorial);
  }

  // Fetch all tutorials
  getTutorials(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching tutorials:', error);
          throw error; // Rethrow to keep observable error going
        })
      );
  }

  // Fetch the last created tutorial
  getLastCreatedTutorial(): Observable<Tutorial> {
    return this.http.get<Tutorial[]>(this.apiUrl)
      .pipe(
        map(tutorials => {
          if (tutorials.length > 0) {
            return tutorials[tutorials.length - 1]; // Get the last tutorial in the array
          } else {
            return null; // Handle case where no tutorials are found
          }
        }),
        catchError(error => {
          console.error('Error fetching tutorials:', error);
          throw error; // Rethrow to keep observable error going
        })
      );
  }
}
