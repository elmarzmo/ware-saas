import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/services/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerts',
  imports: [FormsModule, CommonModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.scss',
})
export class Alerts implements OnInit {

  lowStockProducts: any[] = [];

  constructor(private productService: Product) {}

  ngOnInit() {
    this.loadLowStockProducts();
  }

  loadLowStockProducts() {
    this.productService.getLowStockProducts().subscribe((res: any) => {
      this.lowStockProducts = res;
    }
    );
  }

}
