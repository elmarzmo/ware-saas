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

  // Login fields
  email = '';
  password = '';
  organizationId = '';
  errors: Record<string, string> = {};
  serverError = '';
  isLoading = false;
  successMessage = '';

  // Register fields
  orgName = '';         // ← was missing
  adminName = '';
  adminEmail = '';      // ← was missing
  adminPassword = '';
  registerErrors: Record<string, string> = {};
  registerServerError = '';
  registerSuccessMessage = '';
  registerLoading = false;

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

  onRegister() {   // ← renamed from register() to match template
    this.registerServerError = '';
    this.registerSuccessMessage = '';

    const { valid, errors } = this.validation.validateRegistrationForm(

       this.orgName,this.adminName, this.adminEmail, this.adminPassword
    );
    this.registerErrors = errors;   // ← was writing to this.errors by mistake
    if (!valid || this.registerLoading) return;

    this.registerLoading = true;

    this.auth.createOrganization({
      organizationName:    this.validation.sanitizeText(this.orgName),
      name:  this.validation.sanitizeText(this.adminName),
      email:      this.validation.sanitizeEmail(this.adminEmail),
      password:   this.adminPassword,
    }).subscribe({
      next: (res: any) => {
        this.registerLoading = false;
        this.registerSuccessMessage = `Organization created! <br> Your Organization ID is:<br> <strong>${res.organization}</strong> <br> Save this Organization ID for future login.`;
      },
      error: () => {
        this.registerLoading = false;
        this.registerServerError = 'Registration failed. Please try again.';
      }
    });
  }
}