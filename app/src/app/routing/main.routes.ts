import { Routes } from '@angular/router';
import {KubectlCheatSheetComponent} from "../pages/devops/kubernetes/kubectl-cheat-sheet.component";
import {DockerComponent} from "../pages/devops/docker/docker.component";
import {AwsCdkCheatSheetComponent} from "../pages/devops/aws-cdk/cheat-sheet/aws-cdk-cheat-sheet.component";
import {NpmComponent} from "../pages/programming/node/npm/npm.component";
import {MysqlCheatSheetComponent} from "../pages/databases/mysql/cheat-sheet/mysql-cheat-sheet.component";
import {GitCheatSheetComponent} from "../pages/other/git/cheat-sheet/git-cheat-sheet.component";
import {NewrelicCheatSheetComponent} from "../pages/devops/newrelic/cheat-sheet/newrelic-cheat-sheet.component";
import {AwsCertificationCloudPractitionerComponent} from "../pages/devops/aws-certification/cloud-practioner/aws-certification-cloud-practitioner.component";

export const MAIN_ROUTES: Routes = [
  {
    path: 'kubernetes/kubectl-cheat-sheet',
    component: KubectlCheatSheetComponent
  },
  {
    path: 'docker/cheat-sheet',
    component: DockerComponent
  },
  {
    path: 'aws-cdk/cheat-sheet',
    component: AwsCdkCheatSheetComponent
  },
  {
    path: 'node/npm',
    component: NpmComponent
  },
  {
    path: 'mysql/cheat-sheet',
    component: MysqlCheatSheetComponent
  },
  {
    path: 'git/cheat-sheet',
    component: GitCheatSheetComponent
  },
  {
    path: 'newrelic/cheat-sheet',
    component: NewrelicCheatSheetComponent
  },
  {
    path: 'aws-certification/cloud-practitioner',
    component: AwsCertificationCloudPractitionerComponent
  }
];
