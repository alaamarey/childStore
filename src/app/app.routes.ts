import { Routes } from '@angular/router';
import { ProductComponent } from '../feature/products/products';
import { DetailedProductComponent } from '../feature/detailedProduct/detailed-product.component';
import { AddProductComponent } from '../feature/add-product/add-product';
import { CategoriesComponent } from '../feature/category/category';
import { CategoryDetailsComponent } from '../feature/category-details/category-details';
import { DeleteProductComponent } from '../feature/delete-product-component/delete-product-component';
import { SellerDashboardComponent } from '../feature/seller-dashboard/seller-dashboard';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'products', pathMatch: 'full' },

  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductComponent },
  { path: 'details/:id', component: DetailedProductComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: CategoryDetailsComponent },
  { path: 'delete-product', component: DeleteProductComponent },
  { path: 'seller-dashboard', component: SellerDashboardComponent },

  {
    path: 'login',
    loadComponent: () =>
      import('../feature/auth/login/login')
        .then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('../feature/auth/register/register')
        .then(m => m.RegisterComponent)
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('../feature/auth/profile/profile')
        .then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('../feature/orders/order.routes').then(
        (m) => m.ORDER_ROUTES
      ),
  },
  {
    path: 'update-profile',
    loadComponent: () =>
      import('../feature/auth/update-profile/update-profile')
        .then(m => m.UpdateProfile),
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('../feature/cart/cart').then(m => m.CartComponent)
  },
  {
    path: 'payment-success',
    loadComponent: () =>
      import('../feature/payment-success/payment-success')
        .then(m => m.PaymentSuccessComponent)
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];