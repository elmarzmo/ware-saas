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
  pageSize = 10;


  activeFilter: 'ALL' | 'IN' | 'OUT' = 'ALL';
  errors: Record<string, string> = {};
  serverError = '';
  successMessage = '';
  isLoading = false;

  todayIn = 0;
  todayOut = 0;
  todayInCount = 0;
  todayOutCount = 0;

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
    this.stockService.getMovements({
      page: this.currentPage,
      limit: this.pageSize,
    }).subscribe((res: any) => {
      
      this.movements = res.data;
      this.totalMovements = res.total;
      this.currentPage = res.page;
      this.totalPages = res.pages;
      this.todayIn = res.todayStats?.in?.quantity ?? 0;
      this.todayOut = res.todayStats?.out?.quantity ?? 0;
      this.todayInCount = res.todayStats?.in?.count ?? 0;
      this.todayOutCount = res.todayStats?.out?.count ?? 0;
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

}
