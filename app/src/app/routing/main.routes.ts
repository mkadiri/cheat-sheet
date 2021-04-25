import { Routes } from '@angular/router';
import {KubectlComponent} from "../pages/kubectl/kubectl.component";

export const MAIN_ROUTES: Routes = [
  {
    path: 'kubectl/cheat-sheet',
    component: KubectlComponent
  }
];
