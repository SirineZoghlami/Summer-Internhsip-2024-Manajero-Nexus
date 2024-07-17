import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Introduction } from '../../models/introduction.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IntroductionService {
  private apiUrl = 'http://localhost:8080/api/introductions';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Introduction[]> {
    return this.http.get<Introduction[]>(this.apiUrl);
  }

  createWithImage(introduction: Introduction, file: File): Observable<Introduction> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('content', introduction.content); // Assuming 'content' is the property name on Introduction model
  
    return this.http.post<Introduction>(`${this.apiUrl}/upload`, formData);
  }
  
  updateWithImage(id: string, introduction: Introduction, file: File): Observable<Introduction> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('content', introduction.content); // Assuming 'content' is the property name on Introduction model
  
    return this.http.put<Introduction>(`${this.apiUrl}/${id}/upload`, formData);
  }
  

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
