import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NexusGoal } from '../../models/nexus-goal';

@Injectable({
  providedIn: 'root'
})
export class NexusGoalService {
  private apiUrl = `http://localhost:8080/api/nexus-goals`;

  constructor(private http: HttpClient) { }

  getAllGoals(): Observable<NexusGoal[]> {
    return this.http.get<NexusGoal[]>(this.apiUrl);
  }

  getGoalById(id: string): Observable<NexusGoal> {
    return this.http.get<NexusGoal>(`${this.apiUrl}/${id}`);
  }

  createGoal(goal: NexusGoal): Observable<NexusGoal> {
    return this.http.post<NexusGoal>(`${this.apiUrl}/create`, goal); // Updated endpoint
  }

  updateGoal(id: string, goal: NexusGoal): Observable<NexusGoal> {
    return this.http.put<NexusGoal>(`${this.apiUrl}/update/${id}`, goal); // Updated endpoint
  }

  deleteGoal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
