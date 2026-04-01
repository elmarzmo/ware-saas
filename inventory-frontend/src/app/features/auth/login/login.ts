import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  email = '';
  password = '';
  organizationId = '';

  errors:Record<string, string> ={};
  serverError ='';
  isLoading = false;



  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  // sanaitization
  private sanitizeText(value: string): string {
    return value.trim().replace(/[<>\/\\&'"]/g, '');
  }

  private sanitizeEmail(value: string): string {
    return value.trim().toLowerCase().replace(/[<>\/\\&'"]/g, '');
  }

  // validation
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    // At least 8 characters, one uppercase, one lowercase, one number, one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).{8,128}$/;
    return passwordRegex.test(password);
  }

  private isValidOrganizationId(organizationId: string): boolean {
    return /^[a-zA-Z0-9_-]{3,50}$/.test(organizationId);
  }

  private validate(): boolean {
    this.errors = {};

    const cleanEmail = this.sanitizeEmail(this.email);
    const cleanPassword = this.sanitizeText(this.password);
    const cleanOrganizationId = this.sanitizeText(this.organizationId);

    if (!cleanEmail) {
      this.errors['email'] = 'Email is required';
    } else if (!this.isValidEmail(cleanEmail)) {
      this.errors['email'] = 'Invalid email format';
    }

    if (!cleanPassword) {
      this.errors['password'] = 'Password is required';
    } else if (!this.isValidPassword(cleanPassword)) {
      this.errors['password'] = 'Invalid password format';
    }

    if (!cleanOrganizationId) {
      this.errors['organizationId'] = 'Organization ID is required';
    } else if (!this.isValidOrganizationId(cleanOrganizationId)) {
      this.errors['organizationId'] = 'Invalid organization ID format';
    }

    return Object.keys(this.errors).length === 0;
  }

  onLogin() {
    this.serverError = '';

    if (!this.validate()) return;
    if (this.isLoading) return;

    this.isLoading = true;

    this.auth.login({
      email: this.sanitizeEmail(this.email),
      password: this.password,
      organizationId: this.sanitizeText(this.organizationId)
    }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isLoading = false;
        this.serverError = 'Invalid credentials, please try again.';
        
      }
    });
  }
}
