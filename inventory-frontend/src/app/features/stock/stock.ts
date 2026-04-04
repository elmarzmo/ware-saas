import { Component, OnInit } from '@angular/core';
import { StockService } from '../../core/services/stockService';
import { Product } from '../../core/services/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-stock',
  imports: [FormsModule, CommonModule],
  templateUrl: './stock.html',
  styleUrl: './stock.scss',
})
export class Stock implements OnInit {

  products: any[] = [];
  movements: any[] = [];
  totalMovements = 0;
  currentPage = 1;
  totalPages = 0;


  activeFilter: 'ALL' | 'IN' | 'OUT' = 'ALL';
  errors: Record<string, string> = {};
  serverError = '';
  successMessage = '';
  isLoading = false;

  newMovement = {
    productId: '',
    type: 'IN',
    quantity: 0,
  };

  constructor(
    private stockService: StockService,
    private productService: Product
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadMovements();
  }

  loadProducts() {

    this.productService.getProducts().subscribe((res: any) => {
      
      this.products = res;
    });
  }

  loadMovements() {
    this.stockService.getMovements().subscribe((res: any) => {
      
      this.movements = res.data;
      this.totalMovements = res.total;
      this.currentPage = res.page;
      this.totalPages = res.pages;
    });
  }

  addMovement() {
  this.errors = {};
  this.serverError = '';
  this.successMessage = '';

  if (!this.newMovement.productId)
    this.errors['productId'] = 'Please select a product.';
  if (!['IN', 'OUT'].includes(this.newMovement.type))
    this.errors['type'] = 'Movement type must be IN or OUT.';
  if (!this.newMovement.quantity || this.newMovement.quantity < 1)
    this.errors['quantity'] = 'Quantity must be at least 1.';

  if (Object.keys(this.errors).length > 0 || this.isLoading) return;

  this.isLoading = true;

  this.stockService.createMovement(this.newMovement).subscribe({
    next: () => {
      this.loadMovements();
      this.clearForm();
      this.isLoading = false;
      this.successMessage = 'Movement registered successfully.';
    },
    error: () => {
      this.isLoading = false;
      this.serverError = 'Failed to register movement. Please try again.';
    }
  });
}
  get todayIn(): number {
  return this.movements
    .filter(m => m.type === 'IN' && this.isToday(m.createdAt ?? m.timestamp))
    .reduce((sum, m) => sum + m.quantity, 0);
}

  get todayOut(): number {
  return this.movements
    .filter(m => m.type === 'OUT' && this.isToday(m.createdAt ?? m.timestamp))
    .reduce((sum, m) => sum + m.quantity, 0);
}
  get todayInCount(): number {
  return this.movements.filter(m => m.type === 'IN' && this.isToday(m.createdAt ?? m.timestamp)).length;
}
  get todayOutCount(): number {
  return this.movements.filter(m => m.type === 'OUT' && this.isToday(m.createdAt ?? m.timestamp)).length;
}
  get filteredMovements() {
  if (this.activeFilter === 'ALL') return this.movements;
  return this.movements.filter(m => m.type === this.activeFilter);
}

setFilter(filter: 'ALL' | 'IN' | 'OUT') { this.activeFilter = filter; }

clearForm() {
  this.newMovement = { productId: '', type: 'IN', quantity: 0 };
  this.errors = {};
  this.successMessage = '';
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.loadMovements();
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.loadMovements();
  }
}

private isToday(timestamp?: string | null): boolean {
  if (!timestamp) return false;
  const parsed = new Date(timestamp);
  if (Number.isNaN(parsed.getTime())) return false;
  return parsed.toDateString() === new Date().toDateString();
}
}
