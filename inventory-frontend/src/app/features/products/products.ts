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
  allProducts: any[] = [];
  isFilteredByLowStock = false;

  newProduct = {
    name: '',
    sku: '',
    quantity: 0,
    
  };
  errors: Record<string, string> = {};
  serverError = '';
  successMessage = '';
  isLoading = false;

  editSnapshot: { name: string; sku: string; quantity: number } | null = null;
  updateProductId: string | null = null;

  constructor(private productService: Product) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((res: any) => {
      this.allProducts = res;
      this.products = res;
      this.isFilteredByLowStock = false;
    
    });
  }

 createProduct() {
  this.errors = {};
  this.serverError = '';
  this.successMessage = '';

  if (!this.newProduct.name?.trim())
    this.errors['name'] = 'Product name is required.';
  else if (this.newProduct.name.trim().length < 2)
    this.errors['name'] = 'Name must be at least 2 characters.';

  if (!this.newProduct.sku?.trim())
    this.errors['sku'] = 'SKU is required.';
  else if (!/^[a-zA-Z0-9\-_]{2,30}$/.test(this.newProduct.sku.trim()))
    this.errors['sku'] = 'SKU must be 2–30 alphanumeric characters (hyphens/underscores allowed).';

  if (this.newProduct.quantity == null || this.newProduct.quantity < 0)
    this.errors['quantity'] = 'Quantity must be 0 or more.';

  if (Object.keys(this.errors).length > 0 || this.isLoading) return;

  this.isLoading = true;
  this.productService.createProduct(this.newProduct).subscribe({
    next: () => {
      this.clearForm();
      this.loadProducts();
      this.isLoading = false;
      this.successMessage = 'Product added successfully.';
    },
    error: () => {
      this.isLoading = false;
      this.serverError = 'Failed to add product. Please try again.';
    }
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
      if (this.isFilteredByLowStock) {
    // Toggle back to full list — no extra API call needed
    this.products = this.allProducts;
    this.isFilteredByLowStock = false;
  } else {
    this.products = this.allProducts.filter(p => p.quantity <= 10);
    this.isFilteredByLowStock = true;
  }
    }

    
    

    getProductById(id: string) {
      this.productService.getProductById(id).subscribe((res: any) => {
        console.log(res);
      });
    }
    
    get lowStockCount(): number{
      return this.products.filter(p => p.quantity <= 10).length;
    }
    
    get totalUnits(): number {
      return this.products.reduce((sum, p) => sum + (p.quantity || 0), 0);
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

   clearForm() {
    this.newProduct = { name: '', sku: '', quantity: 0 };
    this.errors = {};
    this.successMessage = '';
  }



}
