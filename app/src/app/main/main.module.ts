import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MainRoutes } from '../routing/navigation.routes';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {KubectlCheatSheetComponent} from '../pages/devops/kubernetes/kubectl-cheat-sheet.component';
import { ClipboardModule } from 'ngx-clipboard';
import { CodeBoxComponent } from '../code-box/code-box.component';
import { ModalComponent } from '../modal/modal.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import {DockerComponent} from '../pages/devops/docker/docker.component';
import {AwsCdkCheatSheetComponent} from '../pages/devops/aws-cdk/cheat-sheet/aws-cdk-cheat-sheet.component';
import {NpmComponent} from '../pages/programming/node/npm/npm.component';
import {MysqlCheatSheetComponent} from '../pages/databases/mysql/cheat-sheet/mysql-cheat-sheet.component';
import {NewrelicCheatSheetComponent} from '../pages/devops/newrelic/cheat-sheet/newrelic-cheat-sheet.component';
import { HttpClientModule  } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild((new MainRoutes()).getRoutesForRouterModule()),
    FormsModule,
    NgbModule,
    ClipboardModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HighlightModule,
    HttpClientModule
  ],
  declarations: [
    KubectlCheatSheetComponent,
    DockerComponent,
    AwsCdkCheatSheetComponent,
    CodeBoxComponent,
    ModalComponent,
    NpmComponent,
    MysqlCheatSheetComponent,
    NewrelicCheatSheetComponent,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ],
})

export class MainModule {}
