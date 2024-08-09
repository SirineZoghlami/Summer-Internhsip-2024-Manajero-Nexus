import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NexusProject } from '../models/nexus-proejct-model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NexusProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  createProject(project: NexusProject): Observable<NexusProject> {
    return this.http.post<NexusProject>(this.apiUrl, project);
  }

  getProjectById(id: string): Observable<NexusProject> {
    return this.http.get<NexusProject>(`${this.apiUrl}/${id}`);
  }

  updateProject(id: string, project: NexusProject): Observable<NexusProject> {
    return this.http.put<NexusProject>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllProjects(): Observable<NexusProject[]> {
    return this.http.get<NexusProject[]>(this.apiUrl);
  }

  // New method to get KPIs
  getProjectKpis(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpis`).pipe(
      catchError(error => {
        console.error('Error fetching KPIs:', error);
        return throwError(() => new Error('Error fetching KPIs'));
      })
    );
  }
}

