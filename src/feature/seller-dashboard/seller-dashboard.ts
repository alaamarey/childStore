import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddProductPayload, Product } from '../../core/models/iproduct';
import { SellerProfile } from '../../core/models/seller-profile';
import { SellerService } from '../../core/services/seller-service';
import { Order, OrderSummary } from '../../core/models/order-item';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage],
  templateUrl: './seller-dashboard.html',
  styleUrls: ['./seller-dashboard.css']
})
export class SellerDashboardComponent implements OnInit {
  // Products state
  products: Product[] = [];
  loadingProducts = false;
  selectedProduct: Product | null = null;
  showAddForm = false;
  showUpdateForm = false;
  showDetailsModal = false;
  detailsProduct: Product | null = null;

  // Form models
  addProductModel: AddProductPayload = {
    title: '',
    price: 0,
    description: '',
    image: '',
    stock: 0,
    rate: 0,
    ratingCount: 0,
    categoryName: ''
  };

  updateProductModel: AddProductPayload = {
    title: '',
    price: 0,
    description: '',
    image: '',
    stock: 0,
    rate: 0,
    ratingCount: 0,
    categoryName: ''
  };

  // Stock update
  stockUpdateValue: { [productId: number]: number } = {};

  // Orders state (optional – uncomment when ready)
  orders: OrderSummary[] = [];
  loadingOrders = false;
  showOrdersList = false;
  selectedOrder: Order | null = null;
  showOrderDetails = false;

  // Profile state
  profile: SellerProfile | null = null;
  loadingProfile = false;
  showProfile = false;

  // Error handling
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private sellerService: SellerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  clearMessages(): void {
    setTimeout(() => {
      this.errorMessage = null;
      this.successMessage = null;
      this.cdr.markForCheck();
    }, 3000);
  }

  //Fetch all products
  fetchProducts(): void {
    this.loadingProducts = true;
    this.errorMessage = null;
    this.sellerService.getAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
        this.loadingProducts = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products: ' + err.message;
        this.loadingProducts = false;
        this.cdr.markForCheck();
        this.clearMessages();
      }
    });
  }






  //View product details
  viewProductDetails(productId: number): void {
    this.sellerService.getProductById(productId).subscribe({
      next: (product) => {
        this.detailsProduct = product;
        this.showDetailsModal = true;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load product details: ' + err.message;
        this.cdr.markForCheck();
        this.clearMessages();
      }
    });
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.detailsProduct = null;
    this.cdr.markForCheck();
  }

  //Add product
  openAddForm(): void {
    this.showAddForm = true;
    this.showUpdateForm = false;
    this.resetAddForm();
    this.cdr.markForCheck();
  }


  resetAddForm(): void {
    this.addProductModel = {
      title: '',
      price: 0,
      description: '',
      image: '',
      stock: 0,
      rate: 0,
      ratingCount: 0,
      categoryName: ''
    };
    this.cdr.markForCheck();
  }


  submitAddProduct(): void {
    if (!this.addProductModel.title || !this.addProductModel.price) {
      this.errorMessage = 'Title and price are required';
      this.cdr.markForCheck();
      this.clearMessages();
      return;
    }

    this.sellerService.addProduct(this.addProductModel).subscribe({
      next: (newProduct) => {
        this.successMessage = 'Product added successfully!';
        this.showAddForm = false;
        this.fetchProducts();    // fetchProducts already calls markForCheck
        this.cdr.markForCheck();
        this.clearMessages();
      },
      error: (err) => {
        this.errorMessage = 'Failed to add product: ' + err.message;
        this.cdr.markForCheck();
        this.clearMessages();
      }
    });
  }


  cancelAddForm(): void {
    this.showAddForm = false;
    this.cdr.markForCheck();
  }

  //Update product
  openUpdateForm(product: Product): void {
    this.selectedProduct = product;
    this.updateProductModel = {
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      stock: product.stock,
      rate: product.rate,
      ratingCount: product.ratingCount,
      categoryName: product.category
    };
    this.showUpdateForm = true;
    this.showAddForm = false;
    this.cdr.markForCheck();
  }


  submitUpdateProduct(): void {
    if (!this.selectedProduct) return;

    this.sellerService.updateProduct(this.selectedProduct.id, this.updateProductModel).subscribe({
      next: (response) => {
        // response هيكون نص زي "Product updated successfully"
        console.log(response);
        this.successMessage = 'Product updated successfully!';
        this.showUpdateForm = false;
        this.selectedProduct = null;
        this.fetchProducts();
        this.clearMessages();
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Failed to update product: ' + err.message;
        this.cdr.markForCheck();
        this.clearMessages();
      }
    });
  }

  cancelUpdateForm(): void {
    this.showUpdateForm = false;
    this.selectedProduct = null;
    this.cdr.markForCheck();
  }

  //Delete product
  deleteProduct(productId: number, productTitle: string): void {
    if (confirm(`Are you sure you want to delete "${productTitle}"?`)) {
      this.sellerService.deleteProduct(productId).subscribe({
        next: () => {

          this.successMessage = 'Product deleted successfully!';
          this.fetchProducts();
          this.cdr.markForCheck();
          this.clearMessages();
        },
        error: (err) => {
          console.log(err);

          this.errorMessage = 'Failed to delete product: ' + err.message;
          this.cdr.markForCheck();
          this.clearMessages();
        }
      });
    }
  }

  //Update stock (separate endpoint)
  updateStock(productId: number): void {
    const newStock = this.stockUpdateValue[productId];
    if (newStock === undefined || newStock < 0) {
      this.errorMessage = 'Please enter a valid stock quantity (0 or more)';
      this.cdr.markForCheck();
      this.clearMessages();
      return;
    }

    this.sellerService.updateProductStock(productId, newStock).subscribe({
      next: () => {
        this.successMessage = `Stock updated to ${newStock}!`;
        this.fetchProducts();
        delete this.stockUpdateValue[productId];
        this.cdr.markForCheck();
        this.clearMessages();
      },
      error: (err) => {
        this.errorMessage = 'Failed to update stock: ' + err.message;
        this.cdr.markForCheck();
        this.clearMessages();
      }
    });
  }

  //Get all orders (uncomment when ready)
  fetchOrders(): void {
    this.loadingOrders = true;
    this.showOrdersList = true;
    this.showProfile = false;
    this.errorMessage = null;
    this.sellerService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loadingOrders = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load orders: ' + err.message;
        this.loadingOrders = false;
        this.cdr.markForCheck();
        this.clearMessages();
      }
    });
  }

  closeOrdersList(): void {
    this.showOrdersList = false;
    this.orders = [];
    this.cdr.markForCheck();
  }

  //View order details (uncomment when ready)
  viewOrderDetails(orderId: number): void {
    this.sellerService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.selectedOrder = order;
        this.showOrderDetails = true;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load order details: ' + err.message;
        this.cdr.markForCheck();
        this.clearMessages();
      }
    });
  }

  closeOrderDetails(): void {
    this.showOrderDetails = false;
    this.selectedOrder = null;
    this.cdr.markForCheck();
  }

  //Get seller profile
  fetchProfile(): void {
    this.loadingProfile = true;
    this.showProfile = true;
    this.showOrdersList = false;
    this.errorMessage = null;

    this.sellerService.getSellerProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.loadingProfile = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile: ' + err.message;
        this.loadingProfile = false;
        this.cdr.markForCheck();
        this.clearMessages();
      }
    });
  }

  closeProfile(): void {
    this.showProfile = false;
    this.profile = null;
    this.cdr.markForCheck();
  }
}