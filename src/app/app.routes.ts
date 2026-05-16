import { Routes } from '@angular/router';
import { ProductComponent } from '../feature/products/products';
import { DetailedProductComponent } from '../feature/detailedProduct/detailed-product.component';
import { AddProductComponent } from '../feature/add-product/add-product';
import { CategoriesComponent } from '../feature/category/category';
import { CategoryDetailsComponent } from '../feature/category-details/category-details';
import { DeleteProductComponent } from '../feature/delete-product-component/delete-product-component';
import { SellerDashboardComponent } from '../feature/seller-dashboard/seller-dashboard';

export const routes: Routes =
    [
        { path: '', redirectTo: 'products', pathMatch: 'full' },
        { path: 'products', component: ProductComponent },
        { path: 'details/:id', component: DetailedProductComponent },
        { path: 'add-product', component: AddProductComponent },
        { path: 'categories', component: CategoriesComponent },
        { path: 'category/:id', component: CategoryDetailsComponent },
        { path: 'delete-product', component: DeleteProductComponent },
        { path: 'seller-dashboard', component: SellerDashboardComponent }



    ];
