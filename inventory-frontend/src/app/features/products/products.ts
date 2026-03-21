import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/services/product';

@Component({
  selector: 'app-products',
  imports: [  ],
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

    updateProduct(id: string, data: any) {
      this.productService.updateProduct(id, data).subscribe(() => {
        this.loadProducts();
      });
    }

    getProductById(id: string) {
      this.productService.getProductById(id).subscribe((res: any) => {
        console.log(res);
      });
    }
    


}
