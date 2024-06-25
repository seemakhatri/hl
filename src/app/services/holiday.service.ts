import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  // private apiUrl = 'https://api.tradinghours.com/v3/markets/holidays';
  // private apiKey = 'xmVcTYWwt62Uz2HOIeOhMFIKyN2CfVv5Uar8P2ktda278adc';

  // constructor(private http: HttpClient) {}

  // getHolidays(finId: string, startDate: string, endDate: string): Observable<{ data: Holiday[] }> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.apiKey}`);
  //   const params = new HttpParams()
  //     .set('fin_id', finId)
  //     .set('start', startDate)
  //     .set('end', endDate);

  //   return this.http.get<{ data: Holiday[] }>(this.apiUrl, { headers, params });
  // }
}
