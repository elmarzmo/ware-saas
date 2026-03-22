import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private auth: Auth
  ) {}

  createMovement(data: any) {
    return this.http.post(`${this.api}/stock`, data, { headers: this.auth.getAuthHeaders() });
  }
  
  getMovements() {
    return this.http.get(`${this.api}/stock`, { headers: this.auth.getAuthHeaders() });
  }
  

  
}
