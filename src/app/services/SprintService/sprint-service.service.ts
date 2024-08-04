import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Sprint } from '../../models/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private apiUrl ='http://localhost:8080/api/sprints';

  constructor(private http: HttpClient) { }

  getAllSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(this.apiUrl);
  }

  getSprintById(id: string): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.apiUrl}/${id}`);
  }

  createSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(this.apiUrl, sprint);
  }

  updateSprint(id: string, sprint: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.apiUrl}/${id}`, sprint);
  }

  deleteSprint(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
