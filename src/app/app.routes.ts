import { Routes } from '@angular/router';
import { ProductComponent } from '../feature/products/products';
import { DetailedProductComponent } from '../feature/detailedProduct/detailed-product.component';
import { AddProductComponent } from '../feature/add-product/add-product';
import { CategoriesComponent } from '../feature/category/category';
import { CategoryDetailsComponent } from '../feature/category-details/category-details';
import { DeleteProductComponent } from '../feature/delete-product-component/delete-product-component';
import { SellerDashboardComponent } from '../feature/seller-dashboard/seller-dashboard';
import { authGuard } from '../core/guards/auth-guard';
import { adminGuard } from '../core/guards/admin.guard';
import { AdminLayoutComponent } from '../feature/admin/layout/admin-layout';

export const routes: Routes = [

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
      import('../feature/auth/login/login').then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('../feature/auth/register/register').then(m => m.RegisterComponent)
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('../feature/auth/profile/profile').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },

  {
    path: 'orders',
    loadChildren: () =>
      import('../feature/orders/order.routes').then(m => m.ORDER_ROUTES),
  },

  {
    path: 'update-profile',
    loadComponent: () =>
      import('../feature/auth/update-profile/update-profile').then(m => m.UpdateProfile),
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
      import('../feature/payment-success/payment-success').then(m => m.PaymentSuccessComponent)
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../feature/admin/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../feature/admin/users/users').then(m => m.UsersComponent)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('../feature/admin/products/products').then(m => m.ProductsComponent)
      },
      {
        path: 'banners',
        loadComponent: () =>
          import('../feature/admin/banners/banners').then(m => m.BannersComponent)
      },
      {
        path: 'pending-sellers',
        loadComponent: () =>
          import('../feature/admin/pending-sellers/pending-sellers').then(m => m.PendingSellersComponent)
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('../feature/admin/orders/admin-orders').then(m => m.AdminOrdersComponent)
      },
      {
        path: 'stats',
        loadComponent: () =>
          import('../feature/admin/stats/stats').then(m => m.StatsComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../feature/admin/settings/settings').then(m => m.SettingsComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  { path: '**', redirectTo: 'products' }
];