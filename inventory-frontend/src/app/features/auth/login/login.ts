import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationService } from '../../../core/services/validation.service';

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
    private router: Router,
    private validation: ValidationService
  ) { }

  onLogin() {
     this.serverError = '';

  const { valid, errors } = this.validation.validateLoginForm(
    this.email, this.password, this.organizationId
  );

  this.errors = errors;
  if (!valid || this.isLoading) return;

  this.isLoading = true;

  this.auth.login({
    email:          this.validation.sanitizeEmail(this.email),
    password:       this.password,
    organizationId: this.validation.sanitizeText(this.organizationId)
  }).subscribe({
    next: () => this.router.navigate(['/dashboard']),
    error: () => {
      this.isLoading = false;
      this.serverError = 'Invalid credentials or organization. Please try again.';
    }
  });
}
}
