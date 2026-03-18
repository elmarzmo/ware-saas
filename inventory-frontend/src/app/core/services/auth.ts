import { Injectable } from '@angular/core';
import { environment } from '../../../emvironments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.api}/auth/login`, data)
    .pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })


    );
  }

  getToken() {
    return localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
  }
}
