import { Component, OnInit } from '@angular/core';
import { StockService } from '../../core/services/stockService';
import { Product } from '../../core/services/product';


@Component({
  selector: 'app-stock',
  imports: [],
  templateUrl: './stock.html',
  styleUrl: './stock.scss',
})
export class Stock implements OnInit {

  products: any[] = [];
  movements: any[] = [];

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
      this.movements = res;
    });
  }

  addMovement() {
    this.stockService.createMovement(this.newMovement).subscribe(() => {
      this.loadMovements();
    });
  }
}
