import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: Auth) {}

  getUsers() {
    const headers = this.auth.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/users`, { headers });
  }

  createUser(user: any) {
    const headers = this.auth.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/users`, user, { headers });
  }

  updateUser(id: string, user: any) {
    const headers = this.auth.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/users/${id}`, user, { headers });
  }

  deleteUser(id: string) {
    const headers = this.auth.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers });
  }
  


  
}
