import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../Modules/admin/components/view-feedbacks/view-feedbacks.component';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'https://hl-backend-r8qx.onrender.com/api';

  constructor(private http: HttpClient) { }

  postFeedback(userName: string, feedback: string): Observable<any> {
    const data = {
      userName: userName,
      feedback: feedback
    };
    return this.http.post(`${this.apiUrl}/feedback`, data);
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedbacks`); 
  }

  deleteFeedback(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/feedback/${id}`); // Corrected endpoint path
  }



}
