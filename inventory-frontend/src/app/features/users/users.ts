import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/userServive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => {

      // Handle the list of users
      this.Users = users as any[];

    });

  }

  createUser() {
    this.userService.createUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = {
        name: '',
        email: '',
        role: 'employee',
        password: '',
      };
    });

  }

  updateUser(user: any) {
    this.userService.updateUser(user._id, user).subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });


  }



}
