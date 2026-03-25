import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from './auth';


@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: Auth) {}

  topProducts() {
    return this.http.get(`${this.apiUrl}/analytics/top-moving-products`, {
      headers: this.auth.getAuthHeaders(),
    });
  }

  activeUsers() {
    return this.http.get(`${this.apiUrl}/analytics/most-active-users`, {
      headers: this.auth.getAuthHeaders(),
    });
  }

  stockTrends() {
    return this.http.get(`${this.apiUrl}/analytics/stock-trends`, {
      headers: this.auth.getAuthHeaders(),
    });
  }
  
}
