import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://new-hl-backend.onrender.com'; 
  currentTabIndex: number = 0;
  allCardItems: any[] = [];

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    const options = {
      headers: this.getAuthHeaders(),
      params: new HttpParams({ fromObject: params || {} })
    };
    return this.http.get<T>(`${this.baseUrl}/api/${endpoint}`, options);
  }

  getById<T>(endpoint: string, id: string): Observable<T> {
    const options = {
      headers: this.getAuthHeaders()
    };
    return this.http.get<T>(`${this.baseUrl}/api/${endpoint}/${id}`, options);
  }
  

  post<T>(endpoint: string, body: any, authRequired = true): Observable<T> {
    const headers = authRequired ? this.getAuthHeaders() : new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(`${this.baseUrl}/api/${endpoint}`, body, { headers });
  }
  

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/api/${endpoint}`, body, {
      headers: this.getAuthHeaders()
    });
  }

  delete<T>(endpoint: string, params?: any): Observable<T> {
    const options = {
      headers: this.getAuthHeaders(),
      params: new HttpParams({ fromObject: params || {} })
    };
    return this.http.delete<T>(`${this.baseUrl}/api/${endpoint}`, options);
  }
}
