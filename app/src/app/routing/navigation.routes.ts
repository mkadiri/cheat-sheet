import {KubectlCheatSheetComponent} from '../pages/devops/kubernetes/kubectl-cheat-sheet.component';
import {DockerComponent} from '../pages/devops/docker/docker.component';
import {AwsCdkCheatSheetComponent} from '../pages/devops/aws-cdk/cheat-sheet/aws-cdk-cheat-sheet.component';
import {NewrelicCheatSheetComponent} from '../pages/devops/newrelic/cheat-sheet/newrelic-cheat-sheet.component';
import {NpmComponent} from '../pages/programming/node/npm/npm.component';
import {MysqlCheatSheetComponent} from '../pages/databases/mysql/cheat-sheet/mysql-cheat-sheet.component';
import {Routes} from '@angular/router';

export interface NavigationRoutes {
  category: string;
  nav: {
    path: string;
    title: string;
    children: {
      path: string;
      title: string;
      component: any;
    }[];
  }[];
}

export const NAVIGATION_ROUTES: NavigationRoutes[] = [
  {
    category: 'DevOps',
    nav: [
      {
        path: 'kubernetes',
        title: 'Kubernetes',
        children: [
          {
            path: 'kubernetes/kubectl-cheat-sheet',
            title: 'Kubectl cheat sheet',
            component: KubectlCheatSheetComponent
          }
        ]
      },
      {
        path: 'docker',
        title: 'Docker',
        children: [
          {
            path: 'docker/cheat-sheet',
            title: 'Cheat sheet',
            component: DockerComponent
          }
        ]
      },
      {
        path: 'aws-cdk',
        title: 'AWS CDK',
        children: [
          {
            path: 'aws-cdk/cheat-sheet',
            title: 'Cheat sheet',
            component: AwsCdkCheatSheetComponent
          }
        ]
      },
      {
        path: 'newrelic',
        title: 'Newrelic',
        children: [
          {
            path: 'newrelic/cheat-sheet',
            title: 'Cheat sheet',
            component: NewrelicCheatSheetComponent
          }
        ]
      }
    ]
  },
  {
    category: 'Programming',
    nav: [
      {
        path: 'node',
        title: 'Node',
        children: [
          {
            path: 'node/npm',
            title: 'NPM',
            component: NpmComponent
          },
          {
            path: 'node/npm',
            title: 'no',
            component: NpmComponent
          }
        ]
      }
    ]
  },
  {
    category: 'Databases',
    nav: [
      {
        path: 'mysql',
        title: 'Mysql',
        children: [
          {
            path: 'mysql/cheat-sheet',
            title: 'Cheat sheet',
            component: MysqlCheatSheetComponent
          }
        ]
      }
    ]
  }
];

export class MainRoutes {
  getRoutesForRouterModule(): Routes {
    const routes: Routes = [];

    NAVIGATION_ROUTES.forEach(route => {
      route.nav.forEach(nav => {
        nav.children.forEach(child => {
          routes.push({
            path: child.path,
            component: child.component
          });
        });
      });
    });

    return routes;
  }
}
