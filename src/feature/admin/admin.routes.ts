

import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard';
import { UsersComponent } from './users/users';
import { PendingSellersComponent } from './pending-sellers/pending-sellers';

export const ADMIN_ROUTES: Routes = [

  {
    path: '',
    component: DashboardComponent
  },

  {
    path: 'users',
    component: UsersComponent
  },

  {
    path: 'pending-sellers',
    component: PendingSellersComponent
  }

];