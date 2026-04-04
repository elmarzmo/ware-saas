import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/userServive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidationService } from '../../core/services/validation.service';

@Component({
  selector: 'app-users',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {

  Users: any[] = [];
  allowedRoles = ['employee', 'manager', 'admin'];

  newUser: any = {
    name: '',
    email: '',
    role: 'employee',
    password: '',
  };

  errors: Record<string, string> = {};
  serverError = '';
  isLoading = false;
  successMessage = '';
  

  constructor(private userService: UserService, private validation: ValidationService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (Users) => {
        this.Users = (Users as any[]).map(u => ({
          ...u,
          editedRole: u.role || 'employee',
          showRoleEditor: false,
        }));
      },
      error: () => this.serverError = 'Failed to load users, please try again later.'  
      
    });
  }

  createUser() {
    this.serverError = '';
    this.successMessage = '';

    const {valid, errors } = this.validation.validateNewUserForm(
      this.newUser.name,
      this.newUser.email,
      this.newUser.password,
      this.newUser.role
    );
    this.errors = errors;
    if (!valid || this.isLoading) return;

    this.isLoading = true;
    
    const payload = {
      name:     this.validation.sanitizeText(this.newUser.name),
      email:    this.validation.sanitizeEmail(this.newUser.email),
      password: this.newUser.password, // don't sanitize — needs special chars
      role:     this.newUser.role,
    };

    this.userService.createUser(payload).subscribe({
      next: () => {
        this.loadUsers();
        this.newUser = { name: '', email: '', role: 'employee', password: '' };
        this.errors = {};
        this.isLoading = false;
        this.successMessage = 'User created successfully.';
      },
      error: () => {
        this.isLoading = false;
        this.serverError = 'Failed to create user. Please try again.';
      }
    });
  }

  startRoleEdit(user: any) {
    user.editedRole = user.role || 'employee';
    user.showRoleEditor = true;
    this.serverError = '';
    this.successMessage = '';
  }

  cancelRoleEdit(user: any) {
    user.editedRole = user.role || 'employee';
    user.showRoleEditor = false;
  }

  changeUserRole(user: any) {
    const desiredRole = user.editedRole || 'employee';
    if (desiredRole === user.role) {
      this.successMessage = `User already assigned the ${desiredRole} role.`;
      user.showRoleEditor = false;
      return;
    }

    this.isLoading = true;
    this.serverError = '';
    this.successMessage = '';

    this.userService.updateUser(user._id, { role: desiredRole }).subscribe({
      next: () => {
        this.loadUsers();
        this.isLoading = false;
        this.successMessage = `Role updated to ${desiredRole}.`;
      },
      error: () => {
        this.isLoading = false;
        this.serverError = 'Failed to update user role.';
      }
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: () => this.serverError = 'Failed to delete user.'
    });
  }
}
