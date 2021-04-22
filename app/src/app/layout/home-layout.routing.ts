import { Routes } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import {KubectlComponent} from "../pages/kubectl/kubectl.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'kubectl',
    component: KubectlComponent
  }
];
