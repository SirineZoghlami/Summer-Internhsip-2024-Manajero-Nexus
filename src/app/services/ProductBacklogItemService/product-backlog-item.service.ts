import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductBacklogItem } from '../../models/product-backlog-item.model';

@Injectable({
  providedIn: 'root'
})
export class ProductBacklogItemService {
  private apiUrl = 'http://localhost:8080/api/product-backlog-items';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<ProductBacklogItem[]> {
    return this.http.get<ProductBacklogItem[]>(this.apiUrl);
  }

  getItemById(id: string): Observable<ProductBacklogItem> {
    return this.http.get<ProductBacklogItem>(`${this.apiUrl}/${id}`);
  }

  createItem(item: ProductBacklogItem): Observable<ProductBacklogItem> {
    return this.http.post<ProductBacklogItem>(this.apiUrl, item);
  }

  updateItem(id: string, item: ProductBacklogItem): Observable<ProductBacklogItem> {
    return this.http.put<ProductBacklogItem>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
