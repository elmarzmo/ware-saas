import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.api}/products`);
  }
  getProductById(id: string) {
    return this.http.get(`${this.api}/products/${id}`);
  }
  getLowStockProducts() {
    return this.http.get(`${this.api}/products/low-stock`);
  }
  createProduct(data: any) {
    return this.http.post(`${this.api}/products`, data);
  }
  updateProduct(id: string, data: any) {
    return this.http.put(`${this.api}/products/${id}`, data);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.api}/products/${id}`);
  }

  
}
