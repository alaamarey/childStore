import { Routes } from '@angular/router';

import { ProductComponent } from '../feature/products/products';

export const routes: Routes =
    [
        { path: '', redirectTo: 'products', pathMatch: 'full' },
        { path: 'products', component: ProductComponent },





    ];
