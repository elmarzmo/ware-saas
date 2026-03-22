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

  editSnapshot: { name: string; sku: string; quantity: number } | null = null;
  updateProductId: string | null = null;

  constructor(private productService: Product) {}

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

    

    startUpdate(product: any) {
      this.updateProductId = product._id;
      this.editSnapshot = { name: product.name, sku: product.sku, quantity: product.quantity };
    }
    cancelUpdate() {
      if (this.editSnapshot && this.updateProductId) {
        const product = this.products.find(p => p._id === this.updateProductId);
        if (product) {
          product.name = this.editSnapshot.name;
          product.sku = this.editSnapshot.sku;
          product.quantity = this.editSnapshot.quantity;
        }
      }
      this.updateProductId = null;
      this.editSnapshot = null;
    }

    saveUpdate(product: any) {
      const payload = {
        name: product.name,
        sku: product.sku,
        quantity : product.quantity,
      };
      this.productService.updateProduct(product._id, payload).subscribe(() => {
        this.updateProductId = null;
        this.editSnapshot = null;
        this.loadProducts();
      });
     
     
    }

    
    



}
