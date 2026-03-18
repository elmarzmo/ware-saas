import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  email = '';
  password = '';
  organizationId = '';


  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  onLogin() {
    this.auth.login({
      email: this.email,
      password: this.password,
      organizationId: this.organizationId
    }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        alert('Login failed');
      }
    });
  }
}
