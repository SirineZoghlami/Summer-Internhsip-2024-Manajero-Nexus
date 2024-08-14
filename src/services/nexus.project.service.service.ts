import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NexusProject, Sprint,NexusGoal, ProductBacklogItem } from '../models/nexus-proejct-model';
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

    getSprintsByProjectId(id: string): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.apiUrl}/${id}/sprints`).pipe(
      catchError(error => {
        console.error('Error fetching sprints:', error);
        return throwError(() => new Error('Error fetching sprints'));
      })
    );
  }
  markSprintAsCompleted(projectId: string, sprintNumber: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${projectId}/sprints/${sprintNumber}/complete`, {});
  }
  
  updateProjectStatusIfCompleted(projectId: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${projectId}/status`, {});
  }
  

  getGoalsByProjectId(id: string): Observable<NexusGoal[]> {
    return this.http.get<NexusGoal[]>(`${this.apiUrl}/${id}/goals`).pipe(
      catchError(error => {
        console.error('Error fetching goals:', error);
        return throwError(() => new Error('Error fetching goals'));
      })
    );
  }
  addProductBacklogItem(projectId: string, backlogItem: ProductBacklogItem): Observable<NexusProject> {
    return this.http.post<NexusProject>(`${this.apiUrl}/${projectId}/backlog-items`, backlogItem);
  }
  
 
  deleteSprint(projectId: string, sprintNumber: number): Observable<void> {
    const url = `${this.apiUrl}/${projectId}/sprints/${sprintNumber}`;
    return this.http.delete<void>(url);
  }
  deleteGoal(projectId: string, goalId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${projectId}/goals/${goalId}`);
  }
    getPerformanceData(): Observable<Map<string, number>> {
      return this.http.get<Map<string, number>>(`${this.apiUrl}/performance`);
    }
  
    getEfficiencyData(): Observable<Map<string, number>> {
      return this.http.get<Map<string, number>>(`${this.apiUrl}/efficiency`);
    }
  
  
}

