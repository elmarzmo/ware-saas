import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  constructor(private router: Router) {}

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
