import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  
  getMovements(options: { page?: number; limit?: number; productId?: string } = {}) {
    let params = new HttpParams();
    if (options.page !== undefined) {
      params = params.set('page', options.page.toString());
    }
    if (options.limit !== undefined) {
      params = params.set('limit', options.limit.toString());
    }
    if (options.productId) {
      params = params.set('productId', options.productId);
    }
    return this.http.get(`${this.api}/stock`, {
      headers: this.auth.getAuthHeaders(),
      params,
    });
  }
  

  
}
