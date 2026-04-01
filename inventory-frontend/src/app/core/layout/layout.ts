import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, RouterLinkActive ],
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
