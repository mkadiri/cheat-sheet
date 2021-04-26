import { Routes } from '@angular/router';
import {KubectlComponent} from "../pages/kubectl/kubectl.component";
import {DockerComponent} from "../pages/docker/docker.component";

export const MAIN_ROUTES: Routes = [
  {
    path: 'kubectl/cheat-sheet',
    component: KubectlComponent
  },
  {
    path: 'docker/cheat-sheet',
    component: DockerComponent
  }
];
