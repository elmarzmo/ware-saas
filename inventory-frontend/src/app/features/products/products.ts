import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/services/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {

  products: any[] = [];

  newProduct = {
    name: '',
    sku: '',
    quantity: 0,
  };

  constructor(private productService: Product) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res;
    
    });
  }

  createProduct() {
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.newProduct = { name: '', sku: '', quantity: 0 };
      this.loadProducts();
    });
  }

    deleteProduct(id: string) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.productService.deleteProduct(id).subscribe(() => {
          this.loadProducts();
        });
      }
    }

    getLowStockProducts() {
      this.productService.getLowStockProducts().subscribe((res: any) => {
        this.products = res;
      });
    }

    
    

    getProductById(id: string) {
      this.productService.getProductById(id).subscribe((res: any) => {
        console.log(res);
      });
    }

    updateProductId: string | null = null;

    startUpdate(id: string) {
      this.updateProductId = id;
    }
    cancelUpdate() {
      this.updateProductId = null;
      this.loadProducts();
    }
    saveUpdate(id: string, data: any) {
      this.productService.updateProduct(id, data).subscribe(() => {
        this.updateProductId = null;
        this.loadProducts();
      });
    }

    
    



}
