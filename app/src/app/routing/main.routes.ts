import { Routes } from '@angular/router';
import {KubectlComponent} from "../pages/kubectl/kubectl.component";
import {DockerComponent} from "../pages/docker/docker.component";
import {AwsCdkCheatSheetComponent} from "../pages/aws-cdk/cheat-sheet/aws-cdk-cheat-sheet.component";

export const MAIN_ROUTES: Routes = [
  {
    path: 'kubectl/cheat-sheet',
    component: KubectlComponent
  },
  {
    path: 'docker/cheat-sheet',
    component: DockerComponent
  },
  {
    path: 'aws-cdk/cheat-sheet',
    component: AwsCdkCheatSheetComponent
  }
];
