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
      next: (Users) => this.Users = Users as any[],
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

  updateUser(user: any) {
    this.userService.updateUser(user._id, user).subscribe({
      next: () => this.loadUsers(),
      error: () => this.serverError = 'Failed to update user.'
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: () => this.serverError = 'Failed to delete user.'
    });
  }
}