import { Injectable } from '@angular/core';

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}
  

@Injectable({
  providedIn: 'root',
})
export class ValidationService {

  // ── Sanitizers ────────────────────────────────────────────────────

  sanitizeText(value: string): string {
    return value.trim().replace(/[<>"'`]/g, '');
  }

  sanitizeEmail(value: string): string {
    return value.trim().toLowerCase().replace(/[^a-z0-9@.\-_+]/g, '');
  }

  // ── Individual rules ──────────────────────────────────────────────

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).{8,128}$/;
    return passwordRegex.test(password);
  }

  isValidName(name: string): boolean {
    return /^[a-zA-ZÀ-ÿ' \-]{2,50}$/.test(name);
  }

  isValidRole(role: string): boolean {
    return ['admin', 'manager', 'employee'].includes(role);
  }

  // ── Reusable field validators ─────────────────────────────────────

  validateEmail(email: string): string {
    const clean = this.sanitizeEmail(email);
    if (!clean)                    return 'Email is required.';
    if (!this.isValidEmail(clean)) return 'Please enter a valid email address.';
    return '';
  }

  validatePassword(password: string): string {
    if (!password)                      return 'Password is required.';
    if (password.length < 8)            return 'Password must be at least 8 characters.';
    if (!this.isValidPassword(password)) return 'Password must include uppercase, lowercase, number, and special character.';
    return '';
  }

  validateName(name: string): string {
    const clean = this.sanitizeText(name);
    if (!clean)                   return 'Name is required.';
    if (!this.isValidName(clean)) return 'Name must be 2–50 letters only (hyphens and apostrophes allowed).';
    return '';
  }

  validateRole(role: string): string {
    if (!this.isValidRole(role)) return 'Role must be admin, manager, or employee.';
    return '';
  }

  // ── Full-form validators (called per component) ───────────────────

  validateLoginForm(email: string, password: string, orgId: string): ValidationResult {
    const errors: Record<string, string> = {};

    const emailErr = this.validateEmail(email);
    if (emailErr) errors['email'] = emailErr;

    const passErr = this.validatePassword(password);
    if (passErr) errors['password'] = passErr;

    if (!orgId?.trim()) errors['organizationId'] = 'Organization ID is required.';
    else if (!/^[a-zA-Z0-9_\-]{3,50}$/.test(orgId.trim())) errors['organizationId'] = 'Organization ID must be 3–50 alphanumeric characters.';

    return { valid: Object.keys(errors).length === 0, errors };
  }

  validateNewUserForm(name: string, email: string, password: string, role: string): ValidationResult {
    const errors: Record<string, string> = {};

    const nameErr = this.validateName(name);
    if (nameErr) errors['name'] = nameErr;

    const emailErr = this.validateEmail(email);
    if (emailErr) errors['email'] = emailErr;

    const passErr = this.validatePassword(password);
    if (passErr) errors['password'] = passErr;

    const roleErr = this.validateRole(role);
    if (roleErr) errors['role'] = roleErr;

    return { valid: Object.keys(errors).length === 0, errors };
  }
}