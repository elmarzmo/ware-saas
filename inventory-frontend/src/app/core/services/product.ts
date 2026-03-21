import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private auth: Auth
  ) {}

  getProducts() {
    return this.http.get(`${this.api}/products`, { headers: this.auth.getAuthHeaders() });
  }
  getProductById(id: string) {
    return this.http.get(`${this.api}/products/${id}`, { headers: this.auth.getAuthHeaders() });
  }
  getLowStockProducts() {
    return this.http.get(`${this.api}/products/low-stock`, { headers: this.auth.getAuthHeaders() });
  }
  createProduct(data: any) {
    return this.http.post(`${this.api}/products`, data, { headers: this.auth.getAuthHeaders() });
  }
  updateProduct(id: string, data: any) {
    return this.http.put(`${this.api}/products/${id}`, data, { headers: this.auth.getAuthHeaders() });
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.api}/products/${id}`, { headers: this.auth.getAuthHeaders() });
  }

  
}
