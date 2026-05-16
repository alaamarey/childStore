import { Routes } from '@angular/router';

import { ProductComponent } from '../feature/products/products';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'products', pathMatch: 'full' },

  {
    path: 'products',
    component: ProductComponent
  },

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
    path: '**',
    redirectTo: 'products'
  }
];