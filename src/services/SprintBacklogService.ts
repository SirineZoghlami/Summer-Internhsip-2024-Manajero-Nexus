import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SprintBacklog } from '../models/sprintBacklog'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class SprintBacklogService {
  private apiUrl = 'http://localhost:8080/api/sprintbacklogs';

  constructor(private http: HttpClient) { }

  createSprintBacklog(sprintBacklog: SprintBacklog): Observable<SprintBacklog> {
    return this.http.post<SprintBacklog>(this.apiUrl, sprintBacklog);
  }

  getAllSprintBacklogs(): Observable<SprintBacklog[]> {
    return this.http.get<SprintBacklog[]>(this.apiUrl);
  }

  getSprintBacklogById(id: string): Observable<SprintBacklog> {
    return this.http.get<SprintBacklog>(`${this.apiUrl}/${id}`);
  }

  updateSprintBacklog(id: string, sprintBacklog: SprintBacklog): Observable<SprintBacklog> {
    return this.http.put<SprintBacklog>(`${this.apiUrl}/${id}`, sprintBacklog);
  }

  deleteSprintBacklog(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateSprintBacklogStatus(id: string, status: string): Observable<SprintBacklog> {
    return this.http.patch<SprintBacklog>(`${this.apiUrl}/${id}/status`, null, {
      params: new HttpParams().set('status', status)
    });
  }
}
