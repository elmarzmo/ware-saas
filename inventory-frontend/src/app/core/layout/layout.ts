import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ RouterOutlet ],
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
