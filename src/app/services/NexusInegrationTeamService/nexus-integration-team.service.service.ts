import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NexusIntegrationTeam } from '../../models/nexus-integration-team.model';

@Injectable({
  providedIn: 'root'
})
export class NexusIntegrationTeamService {
  private apiUrl = 'http://localhost:8080/api/nexus-integration-teams';

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<NexusIntegrationTeam[]> {
    return this.http.get<NexusIntegrationTeam[]>(this.apiUrl);
  }

  getTeamById(id: string): Observable<NexusIntegrationTeam> {
    return this.http.get<NexusIntegrationTeam>(`${this.apiUrl}/${id}`);
  }

  createTeam(team: NexusIntegrationTeam): Observable<NexusIntegrationTeam> {
    return this.http.post<NexusIntegrationTeam>(this.apiUrl, team);
  }

  updateTeam(id: string, team: NexusIntegrationTeam): Observable<NexusIntegrationTeam> {
    return this.http.put<NexusIntegrationTeam>(`${this.apiUrl}/${id}`, team);
  }

  deleteTeam(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
