import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SprintBacklogItem } from '../../models/sprint-backlog-item.model';

@Injectable({
  providedIn: 'root'
})
export class SprintBacklogItemService {
  private apiUrl = 'http://localhost:8080/api/sprint-backlog';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<SprintBacklogItem[]> {
    return this.http.get<SprintBacklogItem[]>(this.apiUrl);
  }

  getItemById(id: string): Observable<SprintBacklogItem> {
    return this.http.get<SprintBacklogItem>(`${this.apiUrl}/${id}`);
  }

  createItem(item: SprintBacklogItem): Observable<SprintBacklogItem> {
    return this.http.post<SprintBacklogItem>(this.apiUrl, item);
  }

  updateItem(id: string, item: SprintBacklogItem): Observable<SprintBacklogItem> {
    return this.http.put<SprintBacklogItem>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
